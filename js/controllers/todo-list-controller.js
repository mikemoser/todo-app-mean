todoApp.controller('todoController', ['$scope', function ($scope) {
  
  $scope.todos = [
    {text:'do one thing', done: true},
    {text:'then do another', done: false}];
 
  $scope.addTodo = function() {
    $scope.todos.push({
      text: $scope.todo.text, 
      done: false
    });

    $scope.todo.text = '';
  };
}]);