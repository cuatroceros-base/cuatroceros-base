const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brevageSchema = new Schema({
  name: String,
  price: Number,
  size: {
    type: String,
    enum: ['shot', 'regular']
  },
  location: {type: Schema.Types.ObjectId, ref: 'Location'}
})

module.exports = mongoose.model('Brevage', brevageSchema)
