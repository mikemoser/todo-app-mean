(function (undefined) {
  var Promise = require('promise');
  var Models = require('../models')

  function login(username, password) {
    return new Promise(function (fulfill, reject) {
      // TODO: Check hashed password
      Models.User.findOne({ username: username }, function (error, result) {
        if (result)
          fulfill({ name: 'mike moser' });
        else
          reject(new Error('Invalid username or password.'));  
      });
    })
  }

  module.exports = {
    login: login
  }
})()