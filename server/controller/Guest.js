const mongoose = require('mongoose');
const Guests = mongoose.model('Guests');

const Get = (req, res) => {
  Guests.find({}, (err, guests) => {
    res.send({
      guests
    });
  })
};

const Save = (req, res) => {
  
  if (!req.body) {
    res.send({err: 'No body request found'});
  }

  req.body.firstName = req.body.firstName.toLowerCase();
  req.body.lastName = req.body.lastName.toLowerCase();

  const guests = new Guests(req.body);

  guests.save((err, g) => {
    console.log(g);
    res.send({
      guest: g
    });
  });
}

module.exports = {
  Get,
  Save
}