const app = require('express')()
const passport = require('passport')

require('dotenv').load()
require('./config/passport')(passport)
require('./config/express')(app)
require('./config/facebook')

const index = require('./routes/index')
app.use('/', index)

const auth = require('./routes/auth')
app.use('/auth', auth)

const home = require('./routes/home')
app.use('/home', home)

const order = require('./routes/order')
app.use('/order', order)

const waitress = require('./routes/waitress')
app.use('/waitress', waitress)

const notification = require('./routes/notification')
app.use('/waitress', notification)

require('./config/error-handler')(app)
module.exports = app
