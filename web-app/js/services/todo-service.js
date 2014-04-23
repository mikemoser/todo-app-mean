todoApp.factory('todoService', function ($http) {
  return {
    getTodos: function () {
      return $http.get('/todos')
      .then(function (result) {
        return result.data;
      });
    },
    create: function (todo) {
      return $http.post('/todos', todo)
      .then(function (result) {
        return result.data;
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
      .then(function (result) {
        return result.data;
      });
    }
  }
});