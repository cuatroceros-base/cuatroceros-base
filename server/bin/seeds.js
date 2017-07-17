const Location = require('../models/Location')
const Brevage = require('../models/Brevage')
const mongoose = require('mongoose')
require('dotenv')

const config = require('../config/config')

mongoose.connect('mongodb://localhost/cuatroceros')
  .then(() => {

    const LocationData = [{
      name: 'Ironhack',
      cordinates: {
        lat: 40.392712,
        lng:-3.698235
      }
    }]

  generateLocations(LocationData, () => {
    Location.findOne()
            .exec()
            .then((location) => {
              generateBrevages(location._id, () => {mongoose.connection.close()})
            })
  })
})

function generateLocations (locationData, callback) {
  let locationObj = locationData.map(p => new Location(p))

  let promisesLocation = locationObj.map(p => new Promise((resolve, reject) => {
    p.save((err, obj) => {
      if (err) {
        console.log(err)
      } else {
        resolve(true)
        console.log(`New location created [${obj.name}] with ID:${obj._id}`)
      }
    })
  }))

  Promise.all(promisesLocation).then(() => {
    callback()
  })
}

function generateBrevages (locationId, callback) {
  const BrevageData = [{
    name: 'Coca-cola',
    price: '5',
    size: 'shot',
    location: locationId
  }, {
    name: 'Water',
    price: '4.55',
    size: 'shot',
    location: locationId
  }, {
    name: 'Beer',
    price: '3',
    size: 'shot',
    location: locationId
  }]

  let brevageObj = BrevageData.map(p => new Brevage(p))

  let promisesBrevage = brevageObj.map(p => new Promise((resolve, reject) => {
    p.save((err, obj) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`New brevage created [${obj.name}] with ID:${obj._id}`)
        resolve(true)
      }
    })
  }))

  Promise.all(promisesBrevage).then(() => {
    callback()
  })
}
