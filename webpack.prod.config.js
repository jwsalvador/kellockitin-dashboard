const config = require('./webpack.config.js');
const webpack = require('webpack');

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  })
];

config.devtool = 'source-map';

config.entry = ['./src/index.jsx'];

module.exports = config;