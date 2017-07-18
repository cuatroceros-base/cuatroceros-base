const Brevage = require('../models/Brevage')
const Order = require('../models/Order')
const {generateBrevageList, computeTotal} = require('../helpers/OrderHelper')

module.exports = {
  index: (req, res, next) => {
    Brevage.find({location: req.params.locationId}).exec()
    .then((brevages) => {
      res.render('order/index', {brevages})
    })
  },
  generateOrder: (req, res, next) => {
    let brevageObjects = Object.keys(req.body).map(brevageId => {
      return {id: brevageId, quantity: parseInt(req.body[brevageId])}
    })

    computeTotal(brevageObjects).then((totalPrice) => {
      const order = new Order({
        brevages: generateBrevageList(brevageObjects),
        totalPrice: totalPrice,
        status: 'onqueue'
      })
      order.save().then(e => res.redirect('order/proceed'))
    })
  }
}
