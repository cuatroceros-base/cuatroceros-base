const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  endpoint: String,
  key: String,
  authSecret: String
})

module.exports = mongoose.model('Notification', NotificationSchema)
