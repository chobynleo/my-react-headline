import { queryNotices, getNavMenus, queryVersion } from '../services/global';
import { auth } from '../../../utils/auth';
import { store } from '../../../utils/func';
import { config } from '../../../common/config';

import userImg from '../../../resources/images/user.jpg';

const sysConfigKey = 'sys_config';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    fetchingNotices: false,
    menus: [],
    layout: config.layout,
    subMenus: [],
    srceenWidth: document.body.clientWidth,
    userAvatarKey: 'userAvatarKey',
    currentUser: {
      userAvatarUrl: userImg
    },
    versionItem: null
  },

  subscriptions: {
    setup({ history, dispatch }) {
      dispatch({ type: 'getLayout' });
      dispatch({ type: 'getMenus' });
      dispatch({ type: 'getUserInfo' });
      dispatch({ type: 'getVersion' });
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    }
  },

  effects: {
    *getMenus(_, { call, put }) {
      const userEntity = auth.getUserEntity();
      let menus = [];
      if (userEntity) {
        const item = {};
        item.id = userEntity.id || '';
        menus = yield call(getNavMenus, item);
      }
      yield put({
        type: 'getMenuEnd',
        payload: menus || []
      });
    },
    *getUserInfo(_, { select, put }) {
      const currentUser = auth.getUserInfo();
      let userAvatarUrl = userImg;
      const currentUserEntity = auth.getUserEntity();
      if (currentUser && currentUserEntity) {
        const currentUserAvatarPath = currentUserEntity.userAvatarPath || '';
        const userId = currentUserEntity.id || '';
        const uploadUserAvatarUrl = `${config.contextPath}/api/users/${userId}/avatar`;
        if (currentUserAvatarPath) {
          userAvatarUrl = uploadUserAvatarUrl;
        }
        currentUser.notifyCount = currentUser.notifyCount ? '' : (currentUser.notifyCount = 0);
        currentUser.name = currentUser.name ? '' : (currentUser.name = currentUser.username || config.name);
        currentUser.avatar = currentUser.avatar ? '' : (currentUser.avatar = userImg);
        currentUser.userAvatarUrl = userAvatarUrl;
        const global = yield select((state) => state.global);
        currentUser.userAvatarKey = global.userAvatarKey;
        currentUser.uploadUserAvatarUrl = uploadUserAvatarUrl;
        yield put({ type: 'getUserInfoEnd', payload: { currentUser } });
      }
    },
    *setLayout({ payload }, { put }) {
      yield put({
        type: 'setLayoutEnd',
        payload
      });
      const sysConfig = {};
      sysConfig.layout = payload;
      store.setItem(sysConfigKey, sysConfig, true);
    },
    *getLayout(_, { select, put }) {
      const global = yield select((state) => state.global);
      const sysConfig = store.getItem(sysConfigKey, true);
      const payload = (sysConfig && sysConfig.layout) || global.layout || {};
      if (payload) {
        yield put({
          type: 'setLayoutEnd',
          payload
        });
      }
    },
    *fetchNotices(_, { call, put }) {
      try {
        yield put({
          type: 'changeNoticeLoading',
          payload: true
        });
        const data = yield call(queryNotices);

        yield put({
          type: 'saveNotices',
          payload: data
        });
        yield put({
          type: 'user/changeNotifyCount',
          payload: data.length
        });
      } catch (error) {
        throw error;
      }
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload
      });
      const count = yield select((state) => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count
      });
    },
    *setHeaderSiderSubMenus({ payload }, { put }) {
      yield put({
        type: 'setHeaderSiderSubMenusEnd',
        payload
      });
    },
    *changeUserAvatarKey(_, { put }) {
      const userAvatarKey = new Date().getTime();
      const userInfo = auth.getUserInfo();
      userInfo.loginUserDTO.userAvatarPath = 'new_path';
      auth.setUserInfo(userInfo);
      yield put({
        type: 'changeUserAvatarKeyEnd',
        payload: { userAvatarKey }
      });
    },

    *getVersion(_, { put, call }) {
      if (auth.isLogin()) {
        const versionItem = yield call(queryVersion);
        yield put({ type: 'getVersionEnd', payload: { versionItem } });
      }
    }
  },

  reducers: {
    getMenuEnd(state, { payload }) {
      return {
        ...state,
        menus: payload
      };
    },
    getUserInfoEnd(state, { payload }) {
      return {
        ...state,
        currentUser: payload.currentUser
      };
    },
    setLayoutEnd(state, { payload }) {
      return {
        ...state,
        layout: payload
      };
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    },
    changeScreenWidth(state, { payload }) {
      return {
        ...state,
        srceenWidth: payload
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
        fetchingNotices: false
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter((item) => item.type !== payload)
      };
    },
    changeNoticeLoading(state, { payload }) {
      return {
        ...state,
        fetchingNotices: payload
      };
    },
    setHeaderSiderSubMenusEnd(state, { payload }) {
      return {
        ...state,
        subMenus: payload.subMenus
      };
    },
    changeUserAvatarKeyEnd(state, { payload }) {
      return {
        ...state,
        userAvatarKey: payload.userAvatarKey,
        currentUser: Object.assign({}, state.currentUser, { userAvatarKey: payload.userAvatarKey })
      };
    },
    getVersionEnd(state, { payload }) {
      return {
        ...state,
        versionItem: payload.versionItem
      };
    }
  }
};
