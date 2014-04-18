todoApp.controller('loginController', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
  $scope.login = function(user) {
    userService.login(user)
    .then(function () {
      $location.url('/');
    }, function (error) {
      $scope.errorMessage = 'Invalid login.';
    })
  }  
}]);