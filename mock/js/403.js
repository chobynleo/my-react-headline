const fetchUrl = '/api/403';

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list'
    });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list'
    });
  }
};
