const session = require('express-session');
const store = require('connect-mongo')(session);
const isProduction = process.env.NODE_ENV === 'production';
const mongoose = require('./mongoose').mongoose;

let sessionMiddleware = session({
  store: new store({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    secure: isProduction,
    //3 years
    maxAge: 1000 * 60 * 60 * 24 * 365 * 5
  },
  secret: process.env.COOKIE_SECRET || 'secret',
  resave: true,
  saveUninitialized: true,
  rolling: true,
});

module.exports = {
  middleware: sessionMiddleware
};
