todoApp.controller('loginController', ['$scope', '$location', '$window', 'userService', function ($scope, $location, $window, userService) {
  $scope.login = function(user) {
    userService.login(user)
    .then(function (result) {
      if (result.error) {
        $scope.errorMessage = result.error;
        return;   
      }

      $window.sessionStorage.token = result.token;
      $location.url('/');  
    }, function (error) {
      $scope.errorMessage = 'Error on login.';
    })
  }  
}]);