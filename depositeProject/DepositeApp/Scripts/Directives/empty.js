(function (app) {
app.directive('empty', function () {
    return {
        require: 'ngModel',
        restrict: '',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.empty = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return false;
                }
                

                // it is invalid
                return true;
            };
        }
    };
    });
}(angular.module("DepositeApp"))); 