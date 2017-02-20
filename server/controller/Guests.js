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
    return res.send({err: 'No body request found'});
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

const Link = (req, res) => {

  if (!req.body) {
    return res.send({err: 'No body request found'});
  }

  const mainId = req.body.ids[0];
  console.log(req.body.ids);
  Guests.update({_id: {'$in': req.body.ids}}, {groupId: mainId}, {multi: true}, (err, updates) => {
    console.log(updates);
    res.send({
      guests: updates
    })
  });
};

module.exports = {
  Get,
  Save,
  Link
}