const Mock = require('mockjs');
const fetchUrl = '/api/tags';

const list = Mock.mock({
  'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
});

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.json(list);
  },
  [`POST ${fetchUrl}`](req, res) {
    res.json(list);
  }
};
