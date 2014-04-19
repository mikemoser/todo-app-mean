var todoController = todoApp.controller('todoController', ['$scope', 'authenticationService', '$location', '$route', 'todoService', function ($scope, authenticationService, $location, $route, todoService) {
  $scope.user = $route.current.locals.data.user;
  $scope.todos = $route.current.locals.data.todos;
 
  $scope.addTodo = function() {
    todoService.create($scope.user._id, $scope.todo)
    .then(function (todo) {
      $scope.todos.push(todo);  
    });
    
    $scope.todo.text = '';
  };

  $scope.logout = function () {
    authenticationService.logout();
  }
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



