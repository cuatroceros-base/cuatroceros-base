var LocalStrategy = require('passport-local').Strategy
var User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = function(passport) {
  passport.use(new LocalStrategy((email, password, next) => {
    User.findOne({
        email
      }).exec()
      .then((user) => {
        if (!user) {
          return next(null, false, {
            message: 'Incorrect email'
          })
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return next(null, false, {
            message: 'Incorrect password'
          })
        }
        return next(null, user)
      }).catch(err => next(err))
  }))

  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  passport.deserializeUser((id, cb) => {
    User.findOne({
      '_id': id
    }, (err, user) => {
      if (err) {
        return cb(err)
      }
      cb(null, user)
    })
  })
}
