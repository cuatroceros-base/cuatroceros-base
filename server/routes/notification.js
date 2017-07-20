const router = require('express').Router()
const NotificationController = require('../controllers/NotificationController')

router.post('/registerNofication', NotificationController.register)
router.get('/statusChanged/:status', NotificationController.received)

module.exports = router
