const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  address: String,
  role: {
    type: String,
    enum: [
      'client',
      'waitress'
    ]
  },
  accessToken: String,
  facebookID: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
