(function (undefined) {
  var Promise = require('promise');
  var Models = require('../models');

  function login(username, password) {
    return Promise.denodeify(Models.User.findOne.bind(Models.User))({ username: username })
    .then(function (result) {
      // TODO: Check hashed password
      if (result)
        return result;
      
      throw new Error('Invalid username or password.');  
    });
  }

  function create(username, password) {
    var user = new Models.User({ 
      username: username,
      password: password // TODO: Hash password
    })

    return Promise.denodeify(user.save.bind(user))()
    .then(function (user) {
      return user;
    });
  }

  module.exports = {
    login: login,
    create: create
  }
})()