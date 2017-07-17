const path = require('path')
const rootPath = path.normalize(path.join(__dirname, '/../'))

module.exports = {
  db: process.env.DB_URL,
  rootPath: rootPath
}
