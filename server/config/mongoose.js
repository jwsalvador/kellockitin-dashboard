const mongoose = require('mongoose');
const Guests = require('../models/Guest');

const MongooseConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://wes:kellockitin1234@ds035563.mlab.com:35563/kellockitin');
  } else {
    mongoose.connect('mongodb://localhost:27017/kellockitin-db');
  }
  mongoose.Promise = global.Promise;
};


module.exports = MongooseConfig;