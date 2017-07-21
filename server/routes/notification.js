const router = require('express').Router()
const NotificationController = require('../controllers/NotificationController')

router.post('/registerNotificationClient/:userId', NotificationController.registerClient)
router.get('/statusChanged/:status/:orderId', NotificationController.received)
router.get('/orderCreated/:status/:orderId', NotificationController.orderCreated)

module.exports = router
