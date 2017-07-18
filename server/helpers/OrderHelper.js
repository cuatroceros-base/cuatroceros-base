const Brevage = require('../models/Brevage')
const Order = require('../models/Order')

module.exports = {
  generateOrder: (brevageObjects) => {
    let brevages = []

    brevageObjects.map((brevage) => {
      if (brevage.quantity != 0) {
        brevages = [...brevages, ...Array(brevage.quantity).fill(brevage.id)]
      }
    })

    return brevages
  },
  computeTotal: (brevageObjects) => {
    return new Promise((resolve, reject) => {
      const brevagesPromises = brevageObjects.map(brevage =>
        Brevage.findOne({_id: brevage.id}).exec()
               .then(brevageDB => {
                 let bregageQuantity = brevage.quantity
                 let totalByBrevage = brevageDB.price * bregageQuantity
                 return totalByBrevage
               })
      )
      Promise.all(brevagesPromises).then((brevagesTotal) => {
        console.log(brevagesTotal)
        let total = brevagesTotal.reduce((total, brevageTotal) => (total + brevageTotal))
        console.log(total)
        resolve(total)
      })
    })
  }
}
