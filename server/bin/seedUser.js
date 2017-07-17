
const User = require('../models/User');
const mongoose = require('mongoose');
require('dotenv');

const config = require('../config/config');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const salt = bcrypt.genSaltSync(bcryptSalt)

mongoose.connect('mongodb://localhost/cuatroceros')
  .then(() => {

    const UserData = [{
      name: "Jorge",
      lastName: "Pedrejon",
      email: "jorgepedrejon@gmail.com",
      password: bcrypt.hashSync("1234", salt),
      dateOfBirth: "01/01/1990",
      address: "Paseo de la Habana 22",
      role: "client"
      },
      {
      name: "Mikel",
      lastName: "Ruma",
      email: "mikelruma@gmail.com",
      password: bcrypt.hashSync("4321", salt),
      dateOfBirth: "06/06/2000",
      address: "Castellana 22",
      role: "waitress"
    }];


  generateUsers(UserData, () => {mongoose.connection.close();});


});

function generateUsers (UserData, callback) {
  let UserObj = UserData.map(p => new User(p));

  let promisesUsers = UserObj.map(p => new Promise((resolve, reject) => {
    p.save((err, obj) => {
      if (err) {
        console.log(err);
      } else {
        resolve(true);
        console.log(`New User created [${obj.name}] with ID:${obj._id}`);
      }
    });
  }));

  Promise.all(promisesUsers).then(() => {
    callback();
  });
}
