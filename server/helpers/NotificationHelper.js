const webPush = require('web-push')

module.exports = {
  sendNotification: (notification, ttl, msg) => (
    webPush.sendNotification({
      endpoint: notification.endpoint,
      TTL: ttl,
      keys: {
        p256dh: notification.key,
        auth: notification.authSecret
      }
    }, msg)
  )
}
