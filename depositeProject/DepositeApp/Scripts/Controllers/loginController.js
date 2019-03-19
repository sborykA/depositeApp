(function (authorizationModule) {
    authorizationModule.controller('loginController',
        ['$scope',  'authorizationFactory', '$location',
            function ($scope, authorizationFactory, $location) {

                $scope.loginData = { login: "", password: "" };
                $scope.messageStatus = false;
                var redirect = function (status,type) {
                    if (status) {
                        $scope.messageStatus = false;
                        if (type == 0) {
                            $location.path('/clientDeclaration');
                        } else if (type == 1) {
                            $location.path('/acceptDepositInformation');
                        }

                    } else {
                        $scope.messageStatus = true;
                        $scope.message = "incorected login or pass";
                        
                    }
                }
                $scope.submitAuthorization = function (isValid) {
                    if (isValid) {
                        authorizationFactory.login($scope.loginData.login, $scope.loginData.password, redirect);
                    }
            }
    }]);

}(angular.module("authorizationModule")));