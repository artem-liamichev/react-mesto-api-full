const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const { PORT = 3002 } = process.env;
const app = express();
const cors = require('cors');
const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const { validateUserBody, validateAuthentication } = require('./validators');

const corsOptions = {
  origin: [
    'https://liamichev.students.nomoredomains.icu',
    'http://liamichev.students.nomoredomains.icu',
    'http://localhost:7777',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateAuthentication, login);
app.post('/signup', validateUserBody, createUser);
app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.all('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}
main();
