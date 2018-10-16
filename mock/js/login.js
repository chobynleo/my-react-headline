/*
  mockjs语法参考官网http://mockjs.com/
 */

const Mock = require('mockjs');

const userLogin = '/api/login';
const userLogout = '/api/logout';

const loginData = Mock.mock({
  username: 'guest',
  enabled: true,
  accountNonExpired: true,
  credentialsNonExpired: true,
  accountNonLocked: true,
  loginUserDTO: {
    id: 'dd55bda7-df0d-4b77-99b2-7056717c6923',
    userAvatarPath: '/e39a5b790c354de1b7950e2bd42ec731.jpg',
    csrfToken: 'aabbcc22cc4ac5'
  },
  authorities: [
    { url: ['/home'], typeCode: '1' },
    { url: ['/component/button'], typeCode: '1' },
    { url: ['/component/table'], typeCode: '1' },
    { url: ['/chart/analysis'], typeCode: '1' },
    { url: ['/chart/monitor'], typeCode: '1' }
  ]
});
module.exports = {
  [`POST ${userLogin}`](req, res) {
    if (req.body.sg_username === 'guest' && req.body.sg_password === 'guest') {
      res.json(loginData);
    } else if (req.body.sg_username === 'test_error' && req.body.sg_password === 'test_error') {
      res.status(401).json({
        errId: '-1',
        errCode: 'SG_AUTH_401_02',
        errMsg: ''
      });
    } else {
      res.status(401).send({});
    }
  },
  [`POST ${userLogout}`](req, res) {
    res.json({});
  },
  [`GET ${userLogin}`](req, res) {
    res.json(loginData);
  }
};
