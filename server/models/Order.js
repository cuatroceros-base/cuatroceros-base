const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  brevages: [{type: Schema.Types.ObjectId, ref: 'Brevage', required: true}],
  waiterId: {type: Schema.Types.ObjectId, ref: 'User'},
  status: {
    type: String,
    enum: [
      'onqueu',
      'ready',
      'served'
    ]
  }
})

module.exports = mongoose.model('Order', orderSchema)
