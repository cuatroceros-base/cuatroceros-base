const router = require('express').Router()
const OrderController = require('../controllers/OrderController')

router.post('/', OrderController.generateOrder)

router.get('/:locationId', OrderController.index)

module.exports = router
