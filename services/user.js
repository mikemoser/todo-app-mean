(function (undefined) {
  var Promise = require('promise');
  var Models = require('../models')

  function login(username, password) {
    return new Promise(function (fulfill, reject) {
      // TODO: Check hashed password
      Models.User.findOne({ username: username }, function (error, result) {
        if (result)
          fulfill(result);
        else
          reject(new Error('Invalid username or password.'));  
      });
    })
  }

  function create(username, password) {
    return new Promise(function (fulfill, reject) {
      var user = new Models.User({ 
        username: username,
        password: password // TODO: Hash password
      })

      user.save(function (error) {
        if (error) 
          reject(error);
        else
          fulfill(user)
      });
    });
  }

  module.exports = {
    login: login,
    create: create
  }
})()