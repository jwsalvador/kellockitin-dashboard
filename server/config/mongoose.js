const mongoose = require('mongoose');
const Guests = require('../models/Guest');

const MongooseConfig = () => {
  mongoose.connect('mongodb://localhost:27017/kellockitin-db');
  mongoose.Promise = global.Promise;
};


module.exports = MongooseConfig;