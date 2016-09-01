'use strict';
const DEV_PORT = 3201;
const isProduction = process.env.NODE_ENV === 'production';
const fallback = require('express-history-api-fallback');
let port = isProduction ? process.env.PORT : DEV_PORT;
if (!port) port = DEV_PORT;
const monitors = require('./monitors');
const path = require('path');
const express = require('express');
const app = express();
const root = path.resolve('./dist');
app.use(express.static(path.resolve(root)));
app.use(fallback('index.html', {root}));

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('connection!');
  socket.on('change', (data) => {
    socket.emit('change', data);
  });
  socket.on('registerMonitor', (name) => {
    console.log('Register monitor', name);
    socket.emit('change', monitors[name] || 'No Monitor Data');
  });

  socket.on('clearMonitor', (name) => {
    console.log('Clearing monitor', name);
  })
});


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