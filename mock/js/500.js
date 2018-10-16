const fetchUrl = '/api/500';

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list'
    });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list'
    });
  }
};
