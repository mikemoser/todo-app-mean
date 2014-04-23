(function (undefined) {
  var Controllers = require('../controllers');
  
  module.exports = function(app, auth) {
    // User Routes  
    app.post('/users', Controllers.User.create);
    app.post('/users/login', Controllers.User.login); 
    app.get('/users/me', auth.requiresLogin, Controllers.User.me);

    // Todo Routes
    app.get('/todos', auth.requiresLogin, Controllers.Todo.list);
    app.post('/todos', auth.requiresLogin, auth.todo.userIsAuthorizedByTodo, Controllers.Todo.create);
    app.put('/todos/:id', auth.requiresLogin, auth.todo.userIsAuthorizedByTodo, Controllers.Todo.update);
    app.delete('/todos/:id', auth.requiresLogin, auth.todo.userIsAuthorizedById, Controllers.Todo.delete);
  }
})();