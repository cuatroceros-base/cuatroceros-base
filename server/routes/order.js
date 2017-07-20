const router = require('express').Router()
const OrderController = require('../controllers/OrderController')

router.post('/', OrderController.generateOrder)

router.get('/:locationId', OrderController.index)

router.post('/status/notification/:orderId', OrderController.assignOrder)

router.get('/status/:clientId', OrderController.getOrderList)

module.exports = router
