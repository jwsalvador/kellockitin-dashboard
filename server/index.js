const express = require('express');
const path = require('path');
const webpackDev = require('./config/webpackDev');
const mongoose = require('./config/mongoose');
const routes = require('./routes');
const expressConfig = require('./config/express');

const Run = () => {
  const app = express();

  mongoose();

  expressConfig(app);
  webpackDev(app);
  routes(app);

  return app;
}

module.exports = {
  Run
}