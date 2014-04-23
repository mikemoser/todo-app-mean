(function (undefined) {
  var Services = require('../services');

  module.exports.list = function (req, res) {
    Services.Todo.getTodosByUserId(req.user._id)
    .then(function (todos) {
      res.json(todos);
    });
  }

  module.exports.create = function (req, res) {
    Services.Todo.create(req.body)
    .then(function (todo) {
      res.json(todo);
    });
  }

  module.exports.delete = function (req, res) {
    Services.Todo.remove(req.params.id)
    .then(function () {
      res.json();
    });
  }

  module.exports.update = function (req, res) {
    Services.Todo.update(req.params.id, req.body)
    .then(function (todo) {
      res.json(todo);
    });
  }
})();