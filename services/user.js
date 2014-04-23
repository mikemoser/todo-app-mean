(function (undefined) {
  var Promise = require('promise');
  var Models = require('../models');
  var crypto = require('crypto');

  function login(username, password) {
    return Promise.denodeify(Models.User.findOne.bind(Models.User))({ username: username })
    .then(function (user) {
      if (!user)
        throw new Error('Invalid username or password.');  

      if (!password)
        throw new Error('Invalid username or password.');

      if (user.password !== hash(user.salt, password))
        throw new Error('Invalid username or password.');  
      
      return user;
    });
  }

  function create(username, password) {
    var hashResult = hashPassword(password);

    var user = new Models.User({ 
      username: username,
      password: hashResult.hash,
      salt: hashResult.salt
    })

    return Promise.denodeify(user.save.bind(user))()
    .then(function (user) {
      return user;
    });
  }

  function hashPassword(password) {
    var salt = createSalt();
    var hashResult = hash(salt, password);

    return {
      hash: hashResult,
      salt: salt
    };
  }

  function createSalt(length) {
    length = length ? length : 32;

    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var string = '';
  
    for (var i = 0; i < length; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      string += chars.substring(randomNumber, randomNumber + 1);
    }

    return string;
  }

  function hash(salt, data) {
    return crypto.createHmac('sha256', salt).update(data).digest('base64');
  }

  module.exports = {
    login: login,
    create: create
  }
})()