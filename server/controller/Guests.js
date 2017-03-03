const mongoose = require('mongoose');
const Guests = mongoose.model('Guests');

const Get = (req, res) => {
  Guests.find({}, (err, guests) => {
    res.send({
      guests
    });
  })
};

const Find = (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

  req.body.firstName = req.body.firstName.toLowerCase().trim();
  req.body.lastName = req.body.lastName.toLowerCase().trim();

  Guests.findOne({firstName: req.body.firstName, lastName: req.body.lastName}, (err, guest) => {
    if (err) {
      return res.send({err})
    }
    if (guest.groupId) {
      return Guests.find({groupId: guest.groupId}, (err, group) => {
        return res.send({
          guest,
          group
        });
      });
    }
    return res.send({
      guest
    })
  });
};

const Save = (req, res) => {
  
  if (!req.body) {
    return res.send({err: 'No body request found'});
  }

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
  Link,
  Find
}