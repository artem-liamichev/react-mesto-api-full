const jwt = require('jsonwebtoken');
require('dotenv').config();

const UnauthorizedRequestError = require('../errors/UnauthorizedRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedRequestError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'SECRET'}`);
    console.log('token:', token)
    console.log('NODE_ENV:', NODE_ENV)
    console.log('JWT_SECRET:', JWT_SECRET)
  } catch (err) {
    next(new UnauthorizedRequestError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
