/*
  mockjs语法参考官网http://mockjs.com/
 */

const Mock = require('mockjs');

const queryVersion = '/api/version';

const versionData = Mock.mock({
  version: '0.15.0',
  isShowVersion: true
});

module.exports = {
  [`GET ${queryVersion}`](req, res) {
    res.json(versionData);
  }
};
