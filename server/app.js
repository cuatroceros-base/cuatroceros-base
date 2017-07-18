const app = require('express')()
const passport = require('passport')

require('dotenv').load()
require('./config/passport')(passport)
require('./config/express')(app)

const index = require('./routes/index')
app.use('/', index)

const auth = require('./routes/auth')
app.use('/auth', auth)

const order = require('./routes/order')
app.use('/order', order)

require('./config/error-handler')(app)
module.exports = app
