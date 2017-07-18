const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const passport = require('passport');
//const flash = require("connect-flash");

router.get('/signup', AuthController.authSignup);

router.post('/signup', AuthController.signup);

router.get("/login", AuthController.authLogin);

router.post("/login", AuthController.login);

router.get("/logout", AuthController.logout);

module.exports = router;
