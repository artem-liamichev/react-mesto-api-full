// логируем запросы к серверу и ошибки на сервере

// каждый запрос к апи сохраняется request.log

// если апи выдает ошибку - она сохраняется в error.log

// логи сохраняются в JSON

// логи добавляются в .gitignore

const winston = require('winston');
const expressWinston = require('express-winston');

// логгер запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
