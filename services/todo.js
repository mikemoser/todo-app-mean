(function (undefined) {
  var Promise = require('promise');
  var Models = require('../models')

  function create(data) {
    return new Promise(function (fulfill, reject) {
      var todo = new Models.Todo({ 
        description: data.description,
        user: data.user,
        dueDate: data.dueDate
      });

      todo.save(function (error) {
        if (error) 
          reject(error);
        else
          fulfill(todo);
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

  function remove(todoId) {
    return new Promise(function (fulfill, reject) {
      Models.Todo.remove({ _id: todoId}, function (error) {
        if (error) 
          reject(error);
        else
          fulfill();
      });
    });
  }

  function update(todoId, data) {
    return new Promise(function (fulfill, reject) {
      Models.Todo.findById(todoId, function (error, todo) {
        todo.description = data.description;
        todo.isComplete = data.isComplete; 

        todo.save(function (error, todo) {
          if (error) 
            reject(error);
          else
            fulfill(todo);
        });
      });
    });
  }

  module.exports = {
    create: create,
    getTodosByUserId: getTodosByUserId,
    remove: remove,
    update: update
  }
})()