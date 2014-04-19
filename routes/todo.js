(function (undefined) {
  var Services = require('../services');

  module.exports.list = function (req, res) {
    Services.Todo.getTodosByUserId(req.params.id)
    .then(function (todos) {
      res.send(todos);
    });
  }

  module.exports.create = function (req, res) {
    Services.Todo.create(req.params.id, req.body.description)
    .then(function (todo) {
      res.send(todo);
    });
  }
})();