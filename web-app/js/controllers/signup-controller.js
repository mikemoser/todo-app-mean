todoApp.controller('signupController', ['$scope', '$location', 'userService', '$window', function ($scope, $location, userService, $window) {
  $scope.signup = function(user) {
    userService.create(user)
    .then(function (result) {
      if (result.error) {
        $scope.errorMessage = result.error;
        return;   
      }

      $window.sessionStorage.token = result.token;
      $location.url('/');  
    }, function (error) {
      $scope.errorMessage = 'Error creating account.';
    })
  }  
}]);