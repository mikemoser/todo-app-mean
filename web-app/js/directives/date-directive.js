todoApp.directive('date', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return new Date(viewValue);
            });
        }
    };
});