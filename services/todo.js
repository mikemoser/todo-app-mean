(function (undefined) {
  var Promise = require('promise');
  var Models = require('../models')

  function create(data) {
    var todo = new Models.Todo({ 
      description: data.description,
      user: data.user,
      dueDate: data.dueDate
    });

    return Promise.denodeify(todo.save.bind(todo))()
    .then(function (todo) {
      return todo;
    });
  }

  function get(todoId) {
    return Promise.denodeify(Models.Todo.findById.bind(Models.Todo))(todoId)
    .then(function (todo) {
      return todo;
    });
  }

  function getTodosByUserId(userId) {
    return Promise.denodeify(Models.Todo.find.bind(Models.Todo))({ user: userId })
    .then(function (todos) {
      return todos;
    });
  }

  function remove(todoId) {
    return Promise.denodeify(Models.Todo.remove.bind(Models.Todo))({ _id: todoId })
    .then(function () {
      return;
    })
  }

  function update(todoId, data) {
    return get(todoId)
    .then(function (todo) {
      todo.description = data.description;
      todo.isComplete = data.isComplete; 
      todo.dueDate = data.dueDate; 
      todo.priority = data.priority;

      return Promise.denodeify(todo.save.bind(todo))()
    })
    .then(function (todo) {
      return todo;
    });
  }

  module.exports = {
    get: get,
    create: create,
    getTodosByUserId: getTodosByUserId,
    remove: remove,
    update: update
  }
})()