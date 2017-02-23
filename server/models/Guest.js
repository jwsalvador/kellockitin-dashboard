const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  firstName: String,
  lastName: String,
  groupId: String,
  diet: String,
  message: String,
  rsvp: String
});

module.exports = mongoose.model('Guests', guestSchema);