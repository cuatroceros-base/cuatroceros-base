const router = require('express').Router()
const IndexController = require('../controllers/IndexController')
const ensureLogin = require('connect-ensure-login')

function roleRedirect (req, res, next) {
  console.log(req.user.role)
  if (req.user.role === 'waitress') {
    res.redirect('/waitress')
  } else if (req.user.role === 'client') {
    res.redirect('/home')
  }
}

router.get('/', ensureLogin.ensureLoggedIn('/auth/login'), roleRedirect, IndexController.index)

module.exports = router
