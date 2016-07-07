'use strict';

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');


module.exports = {
  cache: true,
  devtool: 'source-map',
  entry: {
    letsNope: glob.sync('./src/js/**/*.js?(x)')
  },
  output: {
    path: path.join(__dirname, 'build', 'js'),
    publicPath: 'build/',
    filename: '[name].min.js',
    chunkFilename: '[chunkHash].js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [
      {
        test: /.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          'presets': ['es2015', 'react']
        }
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          'presets': ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
