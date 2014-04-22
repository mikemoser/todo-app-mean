var todoController = todoApp.controller('todoController', ['$scope', 'authenticationService', '$location', '$route', 'todoService', function ($scope, authenticationService, $location, $route, todoService) {
  $scope.user = $route.current.locals.data.user;
  $scope.todos = $route.current.locals.data.todos;
 
  $scope.addTodo = function() {
    todoService.create({ 
      description: $scope.newTodo.description,
      user: $scope.user._id,
      dueDate: $scope.newTodo.dueDate
    })
    .then(function (todo) {
      $scope.todos.push(todo);  
      $scope.newTodo = null;
    });
  };

  $scope.deleteTodo = function(todo) {
    todoService.delete(todo)
    .then(function () {
      var removeIndex = $scope.todos.indexOf(todo);  
      $scope.todos.splice(removeIndex, 1)
    });
  };

  $scope.updateTodo = function(todo) {
    todoService.update(todo);
  };

  $scope.logout = function () {
    authenticationService.logout();
  }

  $scope.sortableOptions = {
    disabled: false,
    containment: 'parent'
  };

  $scope.predicate = 'dueDate';
  
}]);

var loadData = function ($location, authenticationService, todoService) {
  var data = {};

  return authenticationService.loggedin()
  .then(function (user) {
    // TODO: Determine best practice for Angular SPAs
    // If the user is not logged in, then redirect them before displaying the view
    if (!user) {
      $location.url('/login');    
      return;
    }
      
    data.user = user;
    return todoService.getTodos(user._id);
  })
  .then(function (todos) {
    data.todos = todos;
    return data;
  });
}

todoController.resolve = {
  data: loadData
}



