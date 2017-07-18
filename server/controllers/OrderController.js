const Brevage = require('../models/Brevage')
const Order = require('../models/Order')

module.exports = {
  index: (req, res, next) => {
    Brevage.find({location: req.params.locationId}).exec()
    .then((brevages) => {
      res.render('order/index', {brevages})
    })
  },
  order: (req, res, next) => {
    let brevages = []
    Object.keys(req.body).map((brevageId) => {
      if (req.body[brevageId] != 0) {
        brevages = [...brevages, ...Array(parseInt(req.body[brevageId])).fill(brevageId)]
      }
    })

    const order = new Order({
      brevages
    })

    order.save().then(e => console.log('order created'))
  },
  total: (req, res, next) => {
    let total = 0
    Object.keys(req.body).map((brevageId) => {
      Brevage.find({_id: req.params.locationId}).exec()
      .then((brevage) => {
        if (req.body[brevageId] != 0) {
          total =+ parseInt(req.body[brevageId]) * brevage.price
        }
      })
    })
    console.log(total)
  }
}
