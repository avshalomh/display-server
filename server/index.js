'use strict';
const DEV_PORT = 3201;
const compress = require('compression');
const isProduction = process.env.NODE_ENV === 'production';
const fallback = require('express-history-api-fallback');
let port = isProduction ? process.env.PORT : DEV_PORT;
if (!port) port = DEV_PORT;
const path = require('path');
const express = require('express');
const app = express();
const root = path.resolve('./dist');
const sessionMiddleware = require('./session-handler').middleware;
const bodyParser = require('body-parser');

let forceLoginMiddleware = (req,res,next) => {
  if (!req.session.signedIn) {
    res.status(403).send('403');
  } else {
    next();
  }
};

let indexServer = isProduction ? '/index-prod-server.html' : '/index-server.html';
let indexClient = isProduction ? 'index-prod.html' : 'index.html';
let indexLogin = isProduction ? './index-login-prod.html' : 'index-login.html';
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionMiddleware);
app.get('/login', (req,res) => {
  res.sendFile(root + '/' + indexLogin);
});
app.post('/doLogin', require('./login-handler'));

app.get('/', function(req,res) {
  res.sendFile(root + '/' + indexClient);
});

app.use('/server', function(req, res) {
  res.sendFile(root + indexServer);
});
app.use(express.static(path.resolve(root)));
app.use(fallback(indexClient, {root}));

app.use(forceLoginMiddleware);

const http = require('http').Server(app);

let io = require('./sockets');
io.register(http);
require('./monitors').Handler;

http.listen(port, () => {
  console.log(`Server running on port ${port}`);

});

if (!isProduction) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('../webpack.config.js');

  new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    noInfo: true,
    quiet: false,
    publicPath: '/build/',
    proxy: {'*': `http://localhost:${port}`},
    stats: {colors: true},
    historyApiFallback: true
  }).listen(8080, 'localhost', err => {
    if (err) console.log(err);
    console.log('Webpack Dev Server listening at 8080');
  });
}