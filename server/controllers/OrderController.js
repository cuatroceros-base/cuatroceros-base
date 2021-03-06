const fetch = require('node-fetch')

const Brevage = require('../models/Brevage')
const Order = require('../models/Order')
const {generateBrevageList, computeTotal} = require('../helpers/OrderHelper')

module.exports = {
  index: (req, res, next) => {
    Brevage.find({location: req.params.locationId}).exec()
    .then((brevages) => {
      res.render('order/index', {brevages, user: req.user})
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

      order.save().then(element => {
        fetch(`${process.env.AJAX_PATH}/notification/orderCreated/enqueue/${element._id}`)
        .then(() => {
          res.redirect(`order/status/${req.user._id}`)
        })
      })
    })
  },
  assignOrder: (req, res, next) => {
    console.log(req.query)
    Order.findOneAndUpdate({_id: req.params.orderId}, {$set: {status: req.query.state, waiterId: req.query.id}}).exec()
    .then((order) => {
      res.redirect(`/notification/statusChanged/${req.query.state}/${req.params.orderId}`)
    })
  },
  getOrderList: (req, res, next) => {
    Order.find({clientId: req.params.clientId}).exec()
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
            res.render('order/list', {orders: finalOrders, user: req.user})
          })
        })
      })
      .catch(err => err)
  }
}
