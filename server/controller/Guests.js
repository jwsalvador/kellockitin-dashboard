const mongoose = require('mongoose');
const Guests = mongoose.model('Guests');
const nodeAsync = require("async");

const Get = (req, res) => {
  Guests.find({}, (err, guests) => {
    res.send({
      guests
    });
  })
};

const Find = (req, res) => {

  req.body.firstName = req.body.firstName.toLowerCase().trim();
  req.body.lastName = req.body.lastName.toLowerCase().trim();

  Guests.findOne({firstName: req.body.firstName, lastName: req.body.lastName}, (err, guest) => {
    if (err || !guest) {
      return res.send({err: 'not found'})
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

const Delete = (req, res) => {
  Guests.findByIdAndRemove(req.params.id, (err, result) => {

    return res.send({
      status: 'deleted'
    })
  });
}

const Rsvp = (req, res) => {

  var parallels = [];

  req.body.forEach((item) => {
    parallels.push((callback) => {
      Guests.findOneAndUpdate({
        _id: item.id
      }, {
        rsvp: item.rsvp,
        message: item.message,
        diet: item.diet
      }).exec(function(err, model) {
        callback(err, model)
      });
    });
  });

  // Save all updates in parallel
  nodeAsync.parallel(parallels, function(err, results) {
    res.send({
      success: true
    });
  })
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
  Find,
  Rsvp,
  Delete
}
