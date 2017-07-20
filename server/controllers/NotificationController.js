const webPush = require('web-push')
const mongoose = require('mongoose')
const User = require('../models/User')
const Order = require('../models/Order')
const Notification = require('../models/Notification')

const NotificationHelper = require('../helpers/NotificationHelper')

webPush.setGCMAPIKey('AAAAmXDC0ag:APA91bFVUYyiCE6hvJq7X5g2CHBdIfsmsPgbECwhYRfgX_DBqO5nByeVehzdaM4HMzQ4y39FIXWJBnb_BbmCYXAXWjSWwx6IEIglS09tSxJTUf6PkrJCB-p7BQXyZNrg1ZPWi5iq76Jj')

const notificationObject = {}

module.exports = {
  registerClient: (req, res, next) => {
    const newNotification = {
      userId: req.params.userId,
      endpoint: req.body.endpoint,
      key: req.body.key,
      authSecret: req.body.authSecret
    }

    Notification.findOne({userId: req.params.userId}).exec()
       .then(notification => {
         if (!notification) return new Notification(newNotification).save()
          return Notification.findByIdAndUpdate(notification._id, newNotification, {new:true}).exec()
        })
       .then( user => res.send('ok'))
       .catch(e => next(e));
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
        NotificationHelper.sendNotification(notification, req.body.ttl, `the order ${req.params.orderId} has changed the status to ${req.params.status}`)
        .then(function () {
          res.sendStatus(201)
        })
        .catch(function (error) {
          console.log(error)
          res.sendStatus(500)
        })
      })
  },
  orderCreated: (req, res, next) => {
    User.find({role: 'waitress'}).exec()
        .then((users) => {
          let userNotifications = users.forEach((user) => (
            Notification.findOne({userId: user._id}).exec()
            .then((notification) => {
              NotificationHelper.sendNotification(notification, req.body.ttl, `the order ${req.params.orderId} has been created`)
            })
          ))
          Promise.all(userNotifications).then((notifications) => {
            res.sendStatus(201)
          })
          .catch(function (error) {
            console.log(error)
            res.sendStatus(500)
          })
        })
  }
}
