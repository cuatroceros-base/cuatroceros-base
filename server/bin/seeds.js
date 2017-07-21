require('dotenv').config({path: '../.env'})

const Location = require('../models/Location')
const Brevage = require('../models/Brevage')
const User = require('../models/User')

const bcrypt = require('bcrypt')
const bcryptSalt = 10

const salt = bcrypt.genSaltSync(bcryptSalt)

const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
  .then(() => {
    generateLocations()
      .then(() =>
          Location.findOne().exec()
              .then((location) => Promise.all([
                generateUsers(location._id),
                generateBrevages(location._id)
              ]))
              .then(() => {
                mongoose.connection.close()
              })
      )
  })

function generateLocations () {
  const locationData = [{
    name: 'Ironhack',
    cordinates: {
      lat: 40.392712,
      lng: -3.698235
    }
  }]
  return new Promise((resolve, reject) => {
    let locationObj = locationData.map(p => new Location(p))

    let promisesLocation = locationObj.map(p =>
      p.save()
        .then(obj => console.log(`New location created [${obj.name}] with ID:${obj._id}`))
        .catch(err => console.log(err))
    )
    Promise.all(promisesLocation).then(() => {
      resolve()
    })
  })
}

function generateUsers (locationId) {
  const UserData = [{
    name: 'Jorge',
    lastName: 'Pedrejon',
    email: 'jorgepedrejon@gmail.com',
    password: bcrypt.hashSync('1234', salt),
    dateOfBirth: '01/01/1990',
    address: 'Paseo de la Habana 22',
    role: 'client'
  }, {
    name: 'Mikel',
    lastName: 'Ruma',
    email: 'mikelruma@gmail.com',
    password: bcrypt.hashSync('4321', salt),
    dateOfBirth: '06/06/2000',
    address: 'Castellana 22',
    role: 'waitress',
    location: locationId
  }, {
    name: 'Papu',
    lastName: 'papu',
    email: 'papu@gmail.com',
    password: bcrypt.hashSync('1234', salt),
    dateOfBirth: '06/06/2000',
    address: 'Castellana 22',
    role: 'waitress',
    location: locationId
  }]
  return new Promise((resolve, reject) => {
    let UserObj = UserData.map(p => new User(p))

    let promisesUsers = UserObj.map(p =>
      p.save()
        .then(obj => console.log(`New User created [${obj.name}] with ID:${obj._id}`))
        .catch(err => console.log(err))
    )
    Promise.all(promisesUsers).then(() => {
      resolve()
    })
  })
}

function generateBrevages (locationId) {
  const BrevageData = [{
    name: 'Coca-cola',
    price: '3',
    size: 'regular',
    location: locationId
  }, {
    name: 'Water',
    price: '2',
    size: 'regular',
    location: locationId
  }, {
    name: 'Whiskey-cola',
    price: '7',
    size: 'regular',
    location: locationId
  }, {
    name: 'Ron-cola',
    price: '7',
    size: 'regular',
    location: locationId
  }, {
    name: 'Tequila',
    price: '3',
    size: 'shot',
    location: locationId
  }, {
    name: 'Vodka-limon',
    price: '3',
    size: 'regular',
    location: locationId
  }, {
    name: 'Vodka',
    price: '3',
    size: 'shot',
    location: locationId
  }]

  return new Promise((resolve, reject) => {
    let brevageObj = BrevageData.map(p => new Brevage(p))

    let promisesBrevage = brevageObj.map(p =>
      p.save()
        .then(obj => console.log(`New brevage created [${obj.name}] with ID:${obj._id}`))
        .catch(err => console.log(err))
    )
    Promise.all(promisesBrevage).then(() => {
      resolve()
    })
  })
}
