const morgan = require('morgan');
const winston = require('./logger');

morgan.token('message', function (req, res) { return res.locals.errorMessage || '' });

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms :message',
  {
    stream: {
      write: message => winston.info(message.trim()),
    },
  }
);

module.exports = morganMiddleware;