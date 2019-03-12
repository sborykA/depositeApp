(function (authorizationModule) {
    authorizationModule.controller('loginController', /*function ($scope, $http) {*/
        ['$scope',  'authorizationFactory', '$location',
            function ($scope, authorizationFactory, $location) {
            $scope.loginData = { login: "", password: "" };
                $scope.loginClick = function () {
                    var authorizationInformation = authorizationFactory.login($scope.loginData.login, $scope.loginData.password);
                    //console.log(authorizationInformation);
                    //console.log(authorizationInformation.status);
                    if (authorizationInformation.status) {
                        if (authorizationInformation.type==0) {
                            $location.path('/clientDeclaration');
                        } else if (authorizationInformation.type == 1) {
                            $location.path('/acceptDepositInformation');
                        }
                    
                    } else {
                        alert('Pass is 123456!');
                    }
            }

        /*$scope.LoginData = { login: "", password: "" };
        $scope.messageStatus = true;
         var message;
        $http({
            method: 'GET',
            url: '/api/Users1'
        }).then(function successCallback(response) {
            var data = response.data;
            var status = response.status;
            var statusText = response.statusText;
            var headers = response.headers;
            var config = response.config;
            message = checkUser(data);
            $scope.messageStatus = false;

            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        function checkUser(data) {
            data.forEach(function (item, i, arr) {
                if (item.login == $scope.LoginData.login || item.password == $scope.LoginData.password) {
                    return "access";
                }
                else {
                    return "notaccess";
                }
                alert(i + ": " + item + " (массив:" + arr + ")");
            });

        }
        $scope.login = function () {
            $scope.mess = message;
        }*/
    }]);

}(angular.module("authorizationModule")));