const Order = require('../models/Order')

module.exports = {
  order: (req, res, next) => {
    Order.find({location: req.user.location}).exec()
      .then((orders) => {
        let ordersPromises = []
        orders.forEach((e) => {
          ordersPromises.push(new Promise((resolve, reject) => {
            e.populate('clientId', (err, client) => {
              if (err) { return err }
              resolve(client)
            })
          }))
        })
        Promise.all(ordersPromises).then((orders) => {
          let propagatedOrders = orders.map((order) => new Promise((resolve, reject) => {
            order.populate('brevages', (err, client) => {
              if (err) { return err }
              resolve(client)
            })
          })
        )
          Promise.all(propagatedOrders).then((finalOrders) => {
            console.log(finalOrders)
            res.render('waitress/index', {orders, user: req.user})
          })
        })
      })
      .catch(err => err)
  }
}
