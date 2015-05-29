var webpack = require('webpack');

var path = require('path');
var assign = require('lodash/object/assign');

var _env = process.env.NODE_ENV;

var env = {
  production: _env === 'production',
  staging: _env === 'staging',
  test: _env === 'test',
  development: _env === 'development' || typeof _env === 'undefined'
};

assign(env, {
  build: (env.production || env.staging)
});

module.exports = {
  target: 'web',

  entry: './client/entry',

  output: {
    path: path.join(process.cwd(), '/client'),
    pathInfo: true,
    publicPath: 'http://localhost:3000/client/',
    filename: 'main.js'
  },

  resolve: {
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extensions: ['', '.js', '.jsx', '.scss']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: "'" + (_env) + "'"
    })
  ],

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],

    loaders: [],

    noParse: /\.min\.js/
  }

};
