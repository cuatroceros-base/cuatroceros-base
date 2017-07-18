const router = require('express').Router();
const WaitressController = require('../controllers/WaitressController');

router.get('/', WaitressController.order);

module.exports = router;
