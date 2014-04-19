todoApp.factory('authenticationService', function ($http) {
  return {
    login: function (user) {
      return $http.post('/login', user)
      .then(function (results) {
        return results.data;
      });
    },
    logout: function (user) {
      return $http.post('/logout');
    },
    loggedin: function () {
      return $http.get('/loggedin')
      .then(function (results) {
        return results.data;
      });
    }
  }
});