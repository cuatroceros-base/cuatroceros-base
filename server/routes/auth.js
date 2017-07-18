const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const passport = require('passport');
const flash = require("connect-flash");
const FbStrategy = require('passport-facebook').Strategy;


router.get('/signup', AuthController.authSignup);

router.post('/signup', AuthController.signup);

router.get("/login", AuthController.authLogin);

router.post("/login", AuthController.login);

router.get("/logout", AuthController.logout);

router.get("/facebook", AuthController.authFacebook);

router.get("/facebook/callback", AuthController.facebook);

module.exports = router;
