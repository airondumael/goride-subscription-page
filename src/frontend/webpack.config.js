var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, '..', '..', 'node_modules');
var buildPath = path.resolve(__dirname, 'assets', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

console.log(nodeModulesPath);

var config = {

  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',

    // Our application
    mainPath],
  output: {

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a build path,
    // localhost:3000/asssets/build. That makes proxying easier to handle
    publicPath: '/assets/build/'
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
            loader: 'style!css!sass-loader?' + JSON.stringify(
                {
                    includePaths: [path.resolve(__dirname, "app/design/_sass")],
                    sourceMap : true
                })
        },
        {
            test: /\.png$/,
            loader: 'url-loader?limit=10000'
        }
    ]
  },

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
