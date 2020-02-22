const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format((info) => {
      if (info instanceof Error) {
        return Object.assign({}, info, {
          stack: info.stack,
          message: info.message,
        });
      }

      return info;
    })(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console(),
  ],
});

logger.stream = {
  write: message => logger.info(message),
};

logger.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});

module.exports = logger;
