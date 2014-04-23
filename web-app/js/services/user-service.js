todoApp.factory('userService', function ($http) {
  return {
    create: function (user) {
      return $http.post('/users', user)
      .then(function (result) {
        return result.data;
      });
    },
    login: function (user) {
      return $http.post('/users/login', user)
      .then(function (result) {
        return result.data;
      });
    },
    me: function () {
      return $http.get('/users/me')
      .then(function (result) {
        return result.data;
      });
    }
  }
});