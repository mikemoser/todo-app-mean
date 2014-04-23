angular.module('priorityFilters', []).filter('priority',  function () {
  return function (input) {
    switch (input) {
      case 1:
        return 'High';
        break;
      case 2:
        return 'Medium'
        break;
      case 3:
        return 'Low'
        break
      default:
        return 'High'
        break;
    }
  }
});