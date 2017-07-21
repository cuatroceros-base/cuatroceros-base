self.addEventListener('push', function(event) {
  var payload = event.data ? event.data.text() : 'no payload'

  event.waitUntil(
    self.registration.showNotification('Order Status', {
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5w2QRJctwPbx5_7byLjIifvWg8UP-s2DiLaGQ-y5xyMHiZMniiXnQtk',
      body: payload
    })
  )
  self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag)
    event.notification.close()
    event.waitUntil(
      clients.matchAll({
        type: 'window'
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i]
          if (client.url === '/' && 'focus' in client) return client.focus()
        }
        if (clients.openWindow) {
          return clients.openWindow('https://cuatroceros-base.herokuapp.com')
        }
      })
    )
  })
})
