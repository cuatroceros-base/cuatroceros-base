const Brevage = require('../models/Brevage')
const Order = require('../models/Order')

module.exports = {
  index: (req, res, next) => {
    res.send('hola')
  }
}
