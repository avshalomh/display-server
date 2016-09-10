const session = require('express-session');
const store = require('session-file-store')(session);
const isProduction = process.env.NODE_ENV === 'production';

let sessionMiddleware = session({
  store: new store(),
  secret: process.env.COOKIE_SECRET || 'secret',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  secure: isProduction,
  //3 years
  maxAge: 1000 * 60 * 60 * 24 * 365 * 3
});

module.exports = {
  middleware: sessionMiddleware
};
