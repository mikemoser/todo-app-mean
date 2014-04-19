todoApp.controller('signupController', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
  $scope.signup = function(user) {
    userService.create(user)
    .then(function () {
      $location.url('/');
    }, function (error) {
      $scope.errorMessage = 'Invalid, please try again.';
    })
  }  
}]);