const Order = require('../models/Order')

module.exports = {
  order: (req, res, next) => {
    console.log(req.user.location)
    Order.find({location: req.user.location}).populate('clientId').exec()
          .then((orders) => {
            console.log(orders)
            res.render('waitress/index', {orders})
          })


  }
}
