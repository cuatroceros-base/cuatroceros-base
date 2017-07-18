const Location = require('../models/Location')

module.exports = {
  index: (req, res, next) => {
    Location.findOne({name: 'Ironhack'}).exec()
            .then((location) => {res.redirect(`/order/${location._id}`)})
  }
};
