const Brevage = require('../models/Brevage')
const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.db)

mongoose.connect('mongodb://localhost/cuatroceros')
  .then(() => {
    const BrevageData = [{
      name: 'Coca-cola',
      price: '5',
      size: 'shot'
    }, {
      name: 'Water',
      price: '4.55',
      size: 'shot'
    }, {
      name: 'Beer',
      price: '3',
      size: 'shot'
    }]

    let brevageObj = BrevageData.map(p => new Brevage(p))

    let promisesBrevages = brevageObj.map(p => new Promise((resolve, reject) => {
      p.save((err, obj) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`New celebity created [${obj.name}] with ID:${obj._id}`)
          resolve(true)
        }
      })
    }))

    Promise.all([promisesBrevages]).then(() => {
      mongoose.connection.close()
    })
  })
