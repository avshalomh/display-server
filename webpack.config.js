var path = require('path');
var webpack = require('webpack');

const PATHS = {
  app: path.resolve(__dirname, 'src', 'index.jsx'),
  build: path.resolve(__dirname, 'dist', 'build'),
  node: path.resolve(__dirname, 'node_modules'),
};

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json?$/,
      loaders: ['json']
    }
    ]
  }
};
