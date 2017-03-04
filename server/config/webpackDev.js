const path = require('path');

const WebpackDevConfig = (app) => {

  if (process.env.NODE_ENV === 'production') {
    return;
  }

  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('../../webpack.config.js');

  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
};

module.exports = WebpackDevConfig;

