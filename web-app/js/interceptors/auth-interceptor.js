// Add the token to each out going request and redirect user to login
// if the token is not valid and the service returns a 401.
todoApp.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        $location.url('/login');  
      }
      return $q.reject(rejection);
    }
  };
});

todoApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});