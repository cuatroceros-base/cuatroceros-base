// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const passport = require('passport');
// const flash = require("connect-flash");
// User model
const User = require("../models/User");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


module.exports = {
  authSignup: (req, res, next) => {
    res.render('auth/signup');
  },
  signup: (req, res, next) => {
    const { name, lastName, email, password, dateOfBirth, address, mobileNumber } = req.body

    console.log(req.body);

    if (email === "" || password === "") {
      res.render("auth/signup", {
        message: "Indicate username and password"
      });
      return;
    }

    User.findOne({
      email
    }, "email", (err, user) => {
      if (user !== null) {
        res.render("auth/signup", {
          message: "The username already exists"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        name: name,
        lastName: lastName,
        email: email,
        password: hashPass,
        dateOfBirth: dateOfBirth,
        address: address,
        mobileNumber: mobileNumber,
        role: 'client'
      });

      newUser.save((err, obj) => {
        if (err) {
          res.render("/auth/signup", {
            message: "Something went wrong"
          });
        } else {
          res.redirect("/auth/login");
        }
      });
    });
  },
  authLogin: (req, res, next) => {
    res.render("auth/login", {
      // message: req.flash("error")
    });
  },
  login: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    passReqToCallback: true
  }),
  logout: (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  },
  authFacebook: passport.authenticate("facebook"),

  facebook: passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
})

};
