const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  color: { type: String, required: true, },
});

module.exports = mongoose.model('Card', cardSchema);