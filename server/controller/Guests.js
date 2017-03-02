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
    console.log(req.body);
  

  req.body.firstName = req.body.firstName.toLowerCase().trim();
  req.body.lastName = req.body.lastName.toLowerCase().trim();

  const guests = new Guests(req.body);

  

  guests.save((err, g) => {
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
  Guests.update({_id: {'$in': req.body.ids}}, {groupId: mainId}, {multi: true}, (err, status) => {
    if (err || status.ok !== 1) {
      return res.send({guests: null})
    }
    Guests.find({_id: {$in: req.body.ids} }, (err, guests) => {
      return res.send({
        guests
      });
    })

  });
};

module.exports = {
  Get,
  Save,
  Link
}