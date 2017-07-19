const SSE = require('sse-node')

module.exports = {
  received: (req, res, next) => {
    const client = SSE(req, res)
    client.send('Hello worl')
    client.onClose(() => console.log("close"));
  }
}
