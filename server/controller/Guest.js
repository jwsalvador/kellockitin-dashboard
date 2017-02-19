const mongoose = require('mongoose');
const Guests = mongoose.model('Guests');

const Get = (req, res) => {

};

const Save = (req, res) => {

  const guests = new Guests(req.body);

  guests.save((err, g) => {
    console.log(g);
    res.send({
      data: g
    });
  });
}

module.exports = {
  Get,
  Save
}