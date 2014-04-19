todoApp.controller('loginController', ['$scope', '$location', 'authenticationService', function ($scope, $location, authenticationService) {
  $scope.login = function(user) {
    authenticationService.login(user)
    .then(function () {
      $location.url('/');
    }, function (error) {
      $scope.errorMessage = 'Invalid login.';
    })
  }  
}]);