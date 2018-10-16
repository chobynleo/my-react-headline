import { io } from 'SinoGear';

import { config } from '../../../common/config';

const { api, contextPath } = config;
const { userLogin } = api;
export async function login(data) {
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    config: {
      reqEvalJSON: false,
      respRedirect401: false
    }
  };
  const loginData = `sg_username=${encodeURIComponent(data.username)}&sg_password=${encodeURIComponent(data.password)}`;
  console.info('调试输出process.env.PORT:', process.env);
  return io.post(contextPath + userLogin, loginData, options);
}

export async function loginByOAuthWithPSW(data) {
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  let searchParamsStr = '';
  if (data && data.constructor === URLSearchParams) {
    searchParamsStr = data.toString();
  } else {
    console.error(`不支持的参数对象类型 - ${data.constructor}`); // eslint-disable-line
  }
  const userLoginByOAuth = api.loginByOAuthWithPSW;
  const url = searchParamsStr === '' ? `${userLoginByOAuth}` : `${userLoginByOAuth}?${searchParamsStr}`;
  console.info('loginByOAuthWithPSW requestURL: ', url); // eslint-disable-line
  return io.post(url, {}, options);
}

export async function loginByOAuthWithProxyPSW(data) {
  const addRememberMe = Object.assign(data, { rememberMe: false });
  const url = api.loginByOAuthWithProxyPSW;
  return io.post(url, addRememberMe, {});
}

export async function loginByOAuthWithImplicit(data) {
  let searchParamsStr = '';
  if (data && data.constructor === URLSearchParams) {
    searchParamsStr = data.toString();
  } else {
    console.error(`不支持的参数对象类型 - ${data.constructor}`); // eslint-disable-line
  }
  const userLoginByOAuth = api.loginByOAuthWithImplicit;
  const url = searchParamsStr === '' ? `${userLoginByOAuth}` : `${userLoginByOAuth}?${searchParamsStr}`;
  console.info('loginByOAuthWithImplicit href: ', url); // eslint-disable-line
  window.location.href = url;
}

export async function logout() {
  return io.post(contextPath + api.userLogout, {});
}
