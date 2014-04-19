(function (undefined) {
  var Promise = require('promise');
  var Models = require('../models')

  function create(userId, description) {
    return new Promise(function (fulfill, reject) {
      var todo = new Models.Todo({ 
        description: description,
        user: userId
      })

      todo.save(function (error) {
        if (error) 
          reject(error);
        else
          fulfill(todo)
      });
    });
  }

  function getTodosByUserId(userId) {
    return new Promise(function (fulfill, reject) {
      Models.Todo.find({ user: userId }, function (error, results) {
        if (error) 
          reject(error);
        else
          fulfill(results);
      });
    });  
  }

  module.exports = {
    create: create,
    getTodosByUserId: getTodosByUserId
  }
})()