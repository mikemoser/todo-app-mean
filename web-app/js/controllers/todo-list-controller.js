var todoController = todoApp.controller('todoController', ['$scope', 'userService', '$location', '$route', 'todoService', '$window', function ($scope, userService, $location, $route, todoService, $window) {
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
    $window.sessionStorage.token = null;
  }

  $scope.predicate = 'dueDate';
  
}]);

var loadData = function ($location, userService, todoService, $window) {
  var data = {};

  // Don't attempt to load this view if the user is not logged in
  // HACK: Need to determine why this is not just null
  if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
    $location.url('/login')
    return;    
  }

  return userService.me()
  .then(function (user) {  
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



