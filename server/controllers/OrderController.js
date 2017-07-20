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
    }).filter((element) => element.id !== 'location')
    console.log(req.user._id)
    console.log(brevageObjects)

    computeTotal(brevageObjects).then((totalPrice) => {
      const order = new Order({
        brevages: generateBrevageList(brevageObjects),
        totalPrice: totalPrice,
        location: req.body.location,
        clientId: req.user._id,
        status: 'onqueue'
      })
      order.save().then(e => res.redirect('order/proceed'))
    })
  },
  assignOrder: (req, res, next) => {
    console.log(req.query)
    Order.findOneAndUpdate({_id: req.params.orderId}, {$set: {status: req.query.state, waiterId: req.query.id}}).exec()
    .then((order) => {
      res.redirect(`/notification/statusChanged/${req.query.state}/${req.params.orderId}`)
    })
  }
}
