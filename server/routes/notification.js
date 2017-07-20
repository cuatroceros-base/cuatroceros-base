const router = require('express').Router()
const NotificationController = require('../controllers/NotificationController')

router.post('/registerNofication', NotificationController.register)
router.get('/statusChanged/:status/:orderId', NotificationController.received)

module.exports = router
