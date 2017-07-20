const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  brevages: [{type: Schema.Types.ObjectId, ref: 'Brevage', required: true}],
  clientId: {type: Schema.Types.ObjectId, ref: 'User'},
  waiterId: {type: Schema.Types.ObjectId, ref: 'User'},
  totalPrice: Number,
  location: {type: Schema.Types.ObjectId, ref: 'Location'},
  status: {
    type: String,
    enum: [
      'onqueue',
      'assigned',
      'ready'
    ]
  }
})

module.exports = mongoose.model('Order', orderSchema)
