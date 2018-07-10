const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  brand: String,
  model: String
})

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;