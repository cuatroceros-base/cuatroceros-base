const webPush = require('web-push')

webPush.setGCMAPIKey('AAAAmXDC0ag:APA91bFVUYyiCE6hvJq7X5g2CHBdIfsmsPgbECwhYRfgX_DBqO5nByeVehzdaM4HMzQ4y39FIXWJBnb_BbmCYXAXWjSWwx6IEIglS09tSxJTUf6PkrJCB-p7BQXyZNrg1ZPWi5iq76Jj')

const notificationObject = {}

module.exports = {
  register: (req, res, next) => {

    notificationObject.endpoint = req.body.endpoint
    notificationObject.key = req.body.key
    notificationObject.authSecret = req.body.authSecret
    res.send('ok')
  },
  received: (req, res, next) => {

    webPush.sendNotification({
      endpoint: req.body.endpoint,
      TTL: req.body.ttl,
      keys: {
        p256dh: req.body.key,
        auth: req.body.authSecret
      }
    }, 'the order is being processed')
    .then(function () {
      res.sendStatus(201)
    })
    .catch(function (error) {
      console.log(error)
      res.sendStatus(500)
    })
  }
}
