const router = require('express').Router()
const NotificationController = require('../controllers/NotificationController')

router.post('/registerNoficationClient/:userId', NotificationController.registerClient)
router.post('/registerNoficationWaitress', NotificationController.registerWaitress)
router.get('/statusChanged/:status/:orderId', NotificationController.received)
router.get('/orderCreated/:status/:clientId', NotificationController.orderCreated)

module.exports = router
