/**
 *@author zhonghuiquan
 *@time 2018/3/13 17:31
 *@version v3.0.0
 *@class personalSetting
 */
import { NAMESPACE } from '../constants/Constants';
import { router as routerUtil } from '../../../../utils/func';
import { initPersonal, modifyData } from '../services/personalSetting';
import { auth } from '../../../../utils/auth';

export default {
  namespace: NAMESPACE,

  state: {
    personal: {},
    display: true,
    activeKey: '1'
  },
  /*订阅*/
  subscriptions: {
    setup({ dispatch, history }) {
      routerUtil.subscriptionsHistoryListen(history, '/management/personalSetting', () => {
        dispatch({ type: 'initPersonal' });
      });
    }
  },
  effects: {
    /**
     * 初始化个人中心用户数据
     * @param _
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
    *initPersonal(_, { put, call }) {
      if (auth.getUserEntity().id) {
        const [personal] = yield [call(initPersonal, auth.getUserEntity().id)];
        yield put({ type: 'initPersonalEnd', payload: { personal } });
      }
    },
    /**
     * 修改个人档案是否允许编辑
     * @param payload  参数
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
    *personalEdit({ payload }, { put, select, call }) {
      if (auth.getUserEntity().id) {
        const UserState = yield select((state) => state[NAMESPACE]);
        const state = payload;
        state.personal = UserState.personal;
        yield [call(modifyData, UserState.personal, auth.getUserEntity().id)];
        if (UserState.display !== undefined) {
          state.display = payload.display;
        } else {
          state.display = payload.display;
        }
        yield put({ type: 'personalEditEnd', payload: state });
      }
    }
    /**
     * 更新个人档案信息
     * @param payload  参数
     * @param put 用于创建effect描述信息， 发起一个action 到 store
     */
  },
  reducers: {
    initPersonalEnd(state, action) {
      const { personal } = action.payload;
      return Object.assign({}, state, { personal });
    },
    personalEditEnd(state, action) {
      const { display, activeKey } = action.payload;
      return Object.assign({}, state, { display, activeKey });
    }
  }
};
