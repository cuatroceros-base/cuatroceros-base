const router = require('express').Router()
const NotificationController = require('../controllers/NotificationController')

router.get('/received', NotificationController.received)


module.exports = router
