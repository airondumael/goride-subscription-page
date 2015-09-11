var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'assets', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    publicPath: '/assets/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: [nodeModulesPath]
        },
        {
            test: /\.css$/,
            loader: 'style!css'
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass-loader?'
        },
        {
            test: /\.png$/,
            loader: 'url-loader?limit=10000'
        }
    ]
  }
};

module.exports = config;
