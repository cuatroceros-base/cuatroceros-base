const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  address: String,
  mobileNumber: Number,
  role: {
    type: String,
    enum: [
      'client',
      'waitress'
    ]
  },
  accessToken: String,
  facebookID: String,
  location: {type: Schema.Types.ObjectId, ref: 'Location'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
