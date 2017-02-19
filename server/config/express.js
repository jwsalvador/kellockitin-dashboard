const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const ExpressConfig = (app) => {
  app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
};

module.exports = ExpressConfig;