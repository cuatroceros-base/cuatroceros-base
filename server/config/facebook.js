const passport      = require("passport");
const User =  require('../models/User');
const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy({
  clientID: "1940393229507590",
  clientSecret: "4f9fd9d6456dad6909343eaf2fa14558",
  callbackURL: "http://localhost:3000/auth/facebook",
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
