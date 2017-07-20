const webPush = require('web-push')
const mongoose = require('mongoose')

const Order = require('../models/Order')
const Notification = require('../models/Notification')

webPush.setGCMAPIKey('AAAAmXDC0ag:APA91bFVUYyiCE6hvJq7X5g2CHBdIfsmsPgbECwhYRfgX_DBqO5nByeVehzdaM4HMzQ4y39FIXWJBnb_BbmCYXAXWjSWwx6IEIglS09tSxJTUf6PkrJCB-p7BQXyZNrg1ZPWi5iq76Jj')

const notificationObject = {}

module.exports = {
  registerClient: (req, res, next) => {
    const notification = new Notification({
      userId: req.params.userId,
      endpoint: req.body.endpoint,
      key: req.body.key,
      authSecret:req.body.authSecret
    })
    notification.save().then(e => res.send('ok'))

  },
  registerWaitress: (req, res, next) => {
    notificationObject.endpoint = req.body.endpoint
    notificationObject.key = req.body.key
    notificationObject.authSecret = req.body.authSecret

    res.send('ok')
  },

  received: (req, res, next) => {
    Order.findById(req.params.orderId).exec()
      .then(order => Notification.findOne({userId: mongoose.Types.ObjectId(order.clientId)}).exec())
      // .then(order => Notification.findOne({userId: mongoose.Types.ObjectId('596e4b8c9a3c746cd4acf5e3')}).exec())
      .then(notification => {
        webPush.sendNotification({
          endpoint: notification.endpoint,
          TTL: req.body.ttl,
          keys: {
            p256dh: notification.key,
            auth: notification.authSecret
          }
        }, `the order ${req.params.orderId} has changed the status to ${req.params.status}`)
        .then(function () {
          res.sendStatus(201)
        })
        .catch(function (error) {
          console.log(error)
          res.sendStatus(500)
        })
      })
  }
}
