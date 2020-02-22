const logger = require('../utils/logger');

const notFoundHandler = (req, res, next) => {
  res.status(404).send({
    error: 'Not Found',
  });
};

const serverErrorHandler = (err, req, res, next) => {
  logger.error(err);
  res.status(500).send({
    error: 'Server Error',
  });
};

module.exports = {
  notFoundHandler,
  serverErrorHandler,
};
