const Order = require('../models/Order')

module.exports = {
  order: (req, res, next) => {
    console.log(req.user)
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
              console.log(orders)
              res.render('waitress/index', {orders, user: req.user})

            })
          })
          .catch(err => err)
            //console.log(orders)
            //res.render('waitress/index', {orders})
        }
}
