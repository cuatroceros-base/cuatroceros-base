const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
  name: String,
  cordinates: {
    lat: Number,
    lng: Number
  }
})

module.exports = mongoose.model('Location', locationSchema)
