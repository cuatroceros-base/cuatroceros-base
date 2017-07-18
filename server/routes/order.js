const router = require('express').Router()
const OrderController = require('../controllers/OrderController')

router.post('/', OrderController.order)

router.get('/:locationId', OrderController.index)

router.post('/total', OrderController.total)

module.exports = router
