(function (app) {
    app.directive('username', function ($q, $timeout) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                

                ctrl.$asyncValidators.username = function (modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.resolve();
                    }

                    var def = $q.defer();

                    $timeout(function () {
                        // Mock a delayed response
                        

                    }, 2000);

                    return def.promise;
                };
            }
        };
    });
}(angular.module("DepositeApp"))); 