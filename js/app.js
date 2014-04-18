var todoApp = angular.module('todoApp', ['ngRoute']);

todoApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/todo-list',
      controller: 'todoController',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/login', {
      templateUrl: 'partials/login',
      controller: 'loginController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

// Ensure user is logged in before dispalying route
var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) { 
  // Initialize a new promise 
  var deferred = $q.defer(); 

  // Make an AJAX call to check if the user is logged in 
  $http.get('/loggedin').success(function (user) { 
    // Authenticated 
    if (user !== '0') 
      $timeout(deferred.resolve, 0); 
    // Not Authenticated 
    else { 
      $rootScope.message = 'You need to log in.'; 
      $timeout(function () { deferred.reject(); }, 0); 
      $location.url('/login'); 
    } 
  });
};

  