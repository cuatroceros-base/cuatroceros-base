let endpoint
let key
let authSecret

navigator.serviceWorker.register('/js-static/sw.js')
  .then(function (registration) {
    return registration.pushManager.getSubscription()
      .then(function (subscription) {
        if (subscription) {
          return subscription
        }

        return registration.pushManager.subscribe({
          userVisibleOnly: true
        })
      })
  })
    .then(function (subscription) {
      let rawKey = subscription.getKey ? subscription.getKey('p256dh') : ''
      key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : ''
      let rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : ''
      authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : ''

      endpoint = subscription.endpoint

      fetch('/notification/registerNofication', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          key: key,
          authSecret: authSecret
        })
      })
    })
