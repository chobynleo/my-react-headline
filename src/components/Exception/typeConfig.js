const SVG_401 = require('../../resources/svg/401.svg');
const SVG_403 = require('../../resources/svg/403.svg');
const SVG_404 = require('../../resources/svg/404.svg');
const SVG_500 = require('../../resources/svg/500.svg');

const config = {
  401: {
    img: SVG_401,
    title: '401',
    desc: '抱歉，你没有访问权限，五秒后将自动跳转到登录页面'
  },
  403: {
    img: SVG_403,
    title: '403',
    desc: '抱歉，你无权访问该页面'
  },
  404: {
    img: SVG_404,
    title: '404',
    desc: '抱歉，你访问的页面不存在'
  },
  500: {
    img: SVG_500,
    title: '500',
    desc: '抱歉，服务器出错了'
  }
};

export default config;
