const loginURL = '/user/login';
const error401URL = '/exception/401';
const error403URL = '/exception/403';
const jsonServerURL = 'http://localhost:3000';

const config = {
  name: 'SinoGear',
  username: '村民', // 当登录成功，sessionStorage中user_info不存在，或user_info.username不存在时默认显示名字
  messageDuration: 2.5,
  massageMaxCount: 1,
  notificationDuration: 5,
  layout: {
    '/': 'SiderLayout',
    '/user': 'UnauthorizedRightLayout'
  },
  // contextPath不要修改，API的地址调用统一由代理进行。这里的地址默认dev模式下为空字符串''，仅在build前要修改为实际生产服务器地址
  contextPath: process.env.NO_PROXY !== 'true' ? '' : process.env.contextPath || '', // IP配置 TODO contextPath名需重构
  loginUrl: loginURL,
  jsonServerUrl: jsonServerURL, // json-server
  // 是否开启菜单访问权限控制
  enableMenuAccessControl: false,
  openPages: [loginURL, error401URL],
  whitePages: [loginURL, error401URL, error403URL],
  error401Url: error401URL,
  error403Url: error403URL,
  // 全局请求配置
  requestConfig: {
    /*
    reqEvalJSON: true,
    isNotice: false,
    debug: true,
    401: { redirect: true, path: error401URL },
    403: { redirect: false, path: error403URL },
    404: { redirect: false, path: '/exception/404' },
    500: { redirect: false, path: '/exception/500' }
    */
  },
  loginAuth: {
    psw: {
      client_id: 'SA-APPID-20171221170309',
      client_secret: 'ba6bf8dbdcee46bebf96091be6226c14',
      grant_type: 'password'
    },
    implicit: {
      client_id: 'SA-APPID-20171221170309',
      client_secret: 'ba6bf8dbdcee46bebf96091be6226c14',
      scope: 'read',
      response_type: 'token',
      redirect_uri: 'http://localhost:8000/#/blank/login_redirect',
      state: '200'
    }
  },
  api: {
    userLogin: '/api/login',
    userLogout: '/api/logout',
    notices: '/api/notices',
    getMenus: '/api/getMenus',
    forms: '/api/dictForms',
    loginByOAuthWithPSW: 'SinoAuth/oauth/token',
    loginByOAuthWithProxyPSW: 'http://localhost:18080/api/auth/login',
    loginByOAuthWithImplicit: 'http://192.168.14.100:10080/SinoAuth/oauth/authorize'
  }
};

export { config };
