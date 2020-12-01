var path = require('path');
var webpack = require('webpack');
let isProduction = process.env.NODE_ENV === 'production';
let _ = require('lodash');
let autoprefixer = require('autoprefixer');

const PATHS = {
  appClient: path.resolve(__dirname, 'src', 'indexClient.js'),
  appServer: path.resolve(__dirname, 'src', 'indexServer.js'),
  login: path.resolve(__dirname, 'src', 'indexLogin.js'),
  build: path.resolve(__dirname, 'dist', 'build'),
  node: path.resolve(__dirname, 'node_modules'),
};

let entries = {
  'bundle.js': [
    PATHS.appClient
  ],
  'bundleServer.js': [
    PATHS.appServer
  ],
  'bundleLogin.js': [
    PATHS.login
  ]
};

if (!isProduction) {
  _.forEach(entries, (entry) => {
    entry.unshift('webpack-dev-server/client?http://localhost:8080');
    entry.unshift('webpack/hot/dev-server');
  });
}

let config =  {
  devtool: isProduction ? 'cheap-module-source-map' : 'eval',
  entry: entries,
  output: {
    path: PATHS.build,
    filename: '[name]',
    publicPath: 'http://localhost:8080/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: [ autoprefixer({ overrideBrowserslist: ['last 2 versions'] }) ]
      }
    })
  ],
  resolve: {
    extensions: ['*', '.js']
  },
  module: {
    rules: [
      {test: /\.js?$/, loaders: ['babel-loader'], exclude: /node_modules/, include: path.join(__dirname, 'src')},
      {test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css"},
      {test: /\.stylus$/, loader: "style!css!stylus!postcss"}
    ]
  },
  // postcss: [ autoprefixer({ overrideBrowserslist: ['last 2 versions'] }) ]
};

if (isProduction) {
  config.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }));
}
module.exports = config;
