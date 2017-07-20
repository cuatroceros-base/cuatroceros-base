const passport      = require("passport");
const User =  require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  enableProof: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
       return done(null, user);
    } else {
      const newUser = new User({
        facebookID: profile.id,
        role: 'client',
        name: profile.displayName,
        email: profile.email
      });

      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    }

  });

}));
