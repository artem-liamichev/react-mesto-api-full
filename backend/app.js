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
// const whitelist = ['http://liamichev.students.nomoredomains.icu', 'https://liamichev.students.nomoredomains.icu']
// const corsOptions = {
//   // origin: process.env.NODE_ENV === 'development' ? ['*']: [
//   //   'https://liamichev.students.nomoredomains.icu',
//   //   'http://liamichev.students.nomoredomains.icu'
//   // ],
//   origin: 'http://liamichev.students.nomoredomains.icu',
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

const corsOptions = {
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

const whitelist = ['http://localhost:3000', 'http://liamichev.students.nomoredomains.icu', 'https://liamichev.students.nomoredomains.icu'];
const corsOptionsDelegate = (req, callback) => {
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true;
  } else {
    corsOptions.origin = false;
  }
  callback(null, corsOptions);
};

app.get('/products/:id', cors(corsOptionsDelegate), (req, res) => {
  res.json({ msg: 'This is CORS-enabled for a whitelisted domain.' });
});

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
