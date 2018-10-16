import { routerRedux } from 'dva/router';
import { message } from 'antd';

import { login, loginByOAuthWithPSW, loginByOAuthWithProxyPSW, loginByOAuthWithImplicit } from '../services/login';
import { url, router as routerUtil } from '../../../utils/func';
import { auth } from '../../../utils/auth';
import { config } from '../../../common/config';

export default {
  namespace: 'login',

  state: {
    loginLoading: false
  },

  subscriptions: {
    setup({ history, dispatch }) {
      routerUtil.subscriptionsHistoryListen(history, '/blank/login_redirect', () => {
        dispatch({ type: 'loginRedirect' });
      });
    }
  },

  effects: {
    *login({ payload }, { put, call }) {
      try {
        const user = yield call(login, payload);
        if (user && user.username) {
          auth.setUserInfo(user);
          yield put({
            type: 'global/getMenus'
          });
          yield put({
            type: 'global/getUserInfo'
          });
          yield put({
            type: 'global/getVersion'
          });
          yield put(routerRedux.push(url.getFromParam()));
        } else {
          message.error('用户名或密码错误，或用户被禁用，登录失败');
        }
      } catch (error) {
        throw error;
      }
    },
    *loginByOAuthWithPSW({ payload }, { put, call }) {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('client_id', config.loginAuth.psw.client_id);
        searchParams.append('client_secret', config.loginAuth.psw.client_secret);
        searchParams.append('grant_type', config.loginAuth.psw.grant_type);
        searchParams.append('username', payload.username);
        searchParams.append('password', payload.password);
        const result = yield call(loginByOAuthWithPSW, searchParams);
        if (result && result.access_token) {
          auth.setAuthInfo(result);
          yield put({
            type: 'global/getMenus'
          });
          yield put(routerRedux.push(url.getFromParam()));
        } else {
          message.error('用户名或密码错误，或用户被禁用，登录失败!');
        }
      } catch (error) {
        message.error(`用户名或密码错误，或用户被禁用，登录失败! ${error.error_description}`);
        throw error;
      }
    },
    *loginByOAuthWithProxyPSW({ payload }, { put, call }) {
      try {
        const loginReqDto = { username: payload.username, password: payload.password };
        const result = yield call(loginByOAuthWithProxyPSW, loginReqDto);
        if (result && result.access_token) {
          auth.setAuthInfo(result);
          yield put({
            type: 'global/getMenus'
          });
          yield put(routerRedux.push(url.getFromParam()));
        } else {
          message.error('用户名或密码错误，或用户被禁用，登录失败!');
        }
      } catch (error) {
        message.error(`用户名或密码错误，或用户被禁用，登录失败! ${error.error_description}`);
      }
    },
    *loginByOAuthWithImplicit({ payload }, { call }) {
      const searchParams = new URLSearchParams();
      searchParams.append('response_type', config.loginAuth.implicit.response_type);
      searchParams.append('client_id', config.loginAuth.implicit.client_id);
      searchParams.append('redirect_uri', config.loginAuth.implicit.redirect_uri);
      searchParams.append('scope', config.loginAuth.implicit.scope);
      searchParams.append('state', config.loginAuth.implicit.state);
      yield call(loginByOAuthWithImplicit, searchParams);
    },
    *loginRedirect({ payload }, { put }) {
      try {
        const searchParams = new URLSearchParams(window.location.hash);
        if (searchParams.get('access_token')) {
          const result = {};
          result.access_token = searchParams.get('access_token');
          result.jti = searchParams.get('jti');
          result.expires_in = searchParams.get('expires_in');
          result.state = searchParams.get('state');
          auth.setAuthInfo(result);
          yield put({
            type: 'global/getMenus'
          });
          yield put(routerRedux.push(url.getFromParam()));
        } else {
          message.error('获取token失败，登录失败!');
          yield put(routerRedux.push(config.api.userLogin));
        }
      } catch (error) {
        message.error(`${error.error_description} 登录失败!`);
        throw error;
      }
    },
    *logout({ payload }, { put }) {
      auth.removeAuthInfo();
      auth.removeUserInfo();
      yield put(routerRedux.push(config.loginUrl));
    }
  },

  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true
      };
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false
      };
    }
  }
};
