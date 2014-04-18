todoApp.factory('userService', function ($http, $location) {
  return {
    login: function (user) {
      return $http.post('/login', user);
    }
  }
});