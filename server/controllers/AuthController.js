// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const passport = require('passport');
const flash = require("connect-flash");
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
    const name = req.body.username;
    const password = req.body.password;

    if (username === "" || password === "") {
      res.render("auth/signup", {
        message: "Indicate username and password"
      });
      return;
    }

    User.findOne({
      username
    }, "username", (err, user) => {
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
        password: hashPass
      });

      newUser.save((err) => {
        if (err) {
          res.render("auth/signup", {
            message: "Something went wrong"
          });
        } else {
          res.redirect("/");
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
    passReqToCallback: true,
    failureFlash: true
  }),
  logout: (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  }
};
