const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  brevages: {type: Schema.Types.ObjectId, ref: 'Brevage', required: true},
  price: Number,
  size: String
})

module.exports = mongoose.model('Order', orderSchema)
