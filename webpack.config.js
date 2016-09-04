var path = require('path');
var webpack = require('webpack');

const PATHS = {
  appClient: path.resolve(__dirname, 'src', 'indexClient.js'),
  appServer: path.resolve(__dirname, 'src', 'indexServer.js'),
  build: path.resolve(__dirname, 'dist', 'build'),
  node: path.resolve(__dirname, 'node_modules'),
};

module.exports = {
  devtool: 'eval',
  entry: {
    'bundle.js': [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      PATHS.appClient
    ],
    'bundleServer.js': [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      PATHS.appServer
    ]
  }
  ,
  output: {
    path: PATHS.build,
    filename: '[name]',
    publicPath: 'http://localhost:8080/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/, include: path.join(__dirname, 'src')},
      {test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css"},
      {test: /\.useable\.css$/, loader: "style/useable!css"}
    ]
  }
};
