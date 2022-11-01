const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
// const cors = require('./middlewares/cors')
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const { validateUserBody, validateAuthentication } = require('./validators');
const corsOptions = {
  origin: [
    'https://liamichev.students.nomoredomains.icu',
    'http://liamichev.students.nomoredomains.icu',
    'localhost:7777',
    'localhost:3000',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
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
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
main();
