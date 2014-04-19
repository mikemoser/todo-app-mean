todoApp.factory('todoService', function ($http) {
  return {
    getTodos: function (userId) {
      return $http.get('/user/' + userId + '/todos')
      .then(function (results) {
        return results.data;
      });
    },
    create: function (userId, todo) {
      return $http.post('/user/' + userId + '/todos', todo)
      .then(function (results) {
        return results.data;
      });
    }
  }
});