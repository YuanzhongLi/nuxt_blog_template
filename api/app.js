const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const logger = require('./utils/logger');
const indexRouter = require('./routes/index');
const { notFoundHandler, serverErrorHandler } = require('./middleware/error');

const {
  ALLOW_CORS,
} = require('./config');

const app = express();

// プロキシー・サーバーから1番目のホップをクライアントとして信頼(nginxとappを信頼)
app.set('trust proxy', 1);
app.use(helmet());
app.use(morgan('common', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (ALLOW_CORS) {
  app.use(cors());
}

app.use('/', indexRouter);

// 404
app.use(notFoundHandler);

// 500
app.use(serverErrorHandler);

module.exports = app;
