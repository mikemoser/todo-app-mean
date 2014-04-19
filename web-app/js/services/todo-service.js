todoApp.factory('todoService', function ($http) {
  return {
    getTodos: function () {
      return $http.get('/todos')
      .then(function (results) {
        return results.data;
      });
    },
    create: function (todo) {
      return $http.post('/todos', todo)
      .then(function (results) {
        return results.data;
      });
    },
    delete: function (todo) {
      return $http.delete('/todos/' + todo._id, todo)
      .then(function () {
        return;
      }); 
    },
    update: function (todo) {
      return $http.put('/todos/' + todo._id, todo)
      .then(function (todo) {
        return todo;
      });
    }
  }
});