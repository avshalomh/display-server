'use strict';
const DEV_PORT = 3201;
const isProduction = process.env.NODE_ENV === 'production';
let port = isProduction ? process.env.PORT : DEV_PORT;
if (!port) port = DEV_PORT;

const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('connection!');
  socket.on('change', (data) => {
    socket.emit('change', data);
  });
});

http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

if (!isProduction) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('./webpack.config.js');

  new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    noInfo: true,
    quiet: false,
    publicPath: '/build/',
    proxy: { '*': `http://localhost:${port}` },
    stats: { colors: true },
  }).listen(8080, 'localhost', err => {
    if (err) console.log(err);
    console.log('Webpack Dev Server listening at 8080');
  });
}