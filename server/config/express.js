const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const config = require('./config')
const MongoStore = require('connect-mongo')(session)

module.exports = function (app) {
  mongoose.connect(config.db)

  app.set('views', config.rootPath + 'views')
  app.set('view engine', 'jade')
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(config.rootPath + 'public'))

  app.use(session({
    secret: 'cuatroceros',
    cookie: { maxAge: 60000 },
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }))

  app.use(passport.initialize())
  app.use(passport.session())
}
