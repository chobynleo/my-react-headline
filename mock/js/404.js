const fetchUrl = '/api/404';

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212'
    });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212'
    });
  }
};
