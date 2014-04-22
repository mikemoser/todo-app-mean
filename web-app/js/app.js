var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap', 'priorityFilters']);

todoApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/todo-list',
      controller: 'todoController',
      resolve: todoController.resolve
    })
    .when('/login', {
      templateUrl: 'partials/login',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'partials/signup',
      controller: 'signupController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
  