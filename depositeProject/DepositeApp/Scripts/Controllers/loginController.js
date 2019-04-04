(function (authorizationModule) {
    authorizationModule.controller('loginController',
        ['$scope',  'authorizationFactory', '$location',
            function ($scope, authorizationFactory, $location) {
                $scope.messageStatus = false;
                var redirect = function (status,type) {
                    if (status) {
                        $scope.messageStatus = false;
                        if (type == 0) {
                            $location.path('/clientDeclaration');
                        } else if (type == 1) {
                            $location.path('/acceptDepositInformation');
                        }
                        //test
                        else {
                            $location.path('/mainPage');
                        }

                    } else {
                        $scope.messageStatus = true;
                        $scope.message = "Користувача з таким логіном та паролем с системі не знайдено";
                        
                    }
                }
                $scope.submited = false;
                $scope.submitAuthorization = function (isValid) {
                    $scope.submited = true;
                    if (isValid) {
                        authorizationFactory.login($scope.loginData.login, $scope.loginData.password, redirect);
                    }
            }
    }]);

}(angular.module("authorizationModule")));