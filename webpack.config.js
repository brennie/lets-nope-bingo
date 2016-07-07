'use strict';

var path = require('path');
var webpack = require('webpack');


module.exports = {
  cache: true,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/js/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build', 'js'),
    publicPath: 'build/',
    filename: 'bingo.min.js',
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
  plugins: []
};
