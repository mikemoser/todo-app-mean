(function (undefined) {
  var Services = require('../services');

  module.exports.list = function (req, res) {
    Services.Todo.getTodosByUserId(req.user._id)
    .then(function (todos) {
      res.send(todos);
    });
  }

  module.exports.create = function (req, res) {
    Services.Todo.create(req.body)
    .then(function (todo) {
      res.send(todo);
    });
  }

  module.exports.delete = function (req, res) {
    Services.Todo.remove(req.params.id)
    .then(function () {
      res.send(200);
    });
  }

  module.exports.update = function (req, res) {
    Services.Todo.update(req.params.id, req.body)
    .then(function (todo) {
      res.send(todo);
    });
  }
})();