todoApp.factory('userService', function ($http) {
  return {
    create: function (user) {
      return $http.post('/users', user)
      .then(function (results) {
        return results.data;
      });
    }
  }
});