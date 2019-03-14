(function (app) {
    app.controller('clientDeclarationController', function ($scope, clientOperationService) {
        $scope.clientInBase = false;
        $scope.checkClientType = function (ipn) {
            $scope.messageStatus = false;
            $scope.showInputForm= false;
            $scope.cientInSys = false;
            $scope.user = {};
            clientOperationService.checkClient(ipn)
                .then(function successCallback(response) {
                    $scope.user = response.data;
                    $scope.user.StartDepositeDate = new Date($scope.user.StartDepositeDate);
                    $scope.user.EndDepositeDate = new Date($scope.user.EndDepositeDate);
                    $scope.message = "Клієнта знайдено";
                    $scope.messageStatus = true;
                    $scope.showInputForm = true;
                    $scope.clientInBase = true;
                    console.log($scope.user);
                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    
                    $scope.message = "Клієнта не знайдено";
                    $scope.messageStatus = true;
                    $scope.showInputForm = true;
                    $scope.clientInBase = false;
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
        $scope.saveData = function (user) {
             if ($scope.clientInBase) {
                clientOperationService.updateClientInfo(user)
                    .then(function successCallback(response) {
                        console.log(user);
                        $scope.user = response.data;
                        $scope.message = "Дані обновлено";

                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {

                        $scope.message = "Помилка запису";
                        $scope.messageStatus = true

                    });
             } else if (!$scope.clientInBase) {
                 clientOperationService.sendClientInfo(user)
                     .then(function successCallback(response) {
                         console.log(user);
                         $scope.user = response.data;
                         $scope.message = "Дані обновлено";

                         // this callback will be called asynchronously
                         // when the response is available
                     }, function errorCallback(response) {

                         $scope.message = "Помилка запису";
                         $scope.messageStatus = true

                     });
             }
        }
    
        /*$scope.ipn = "";
        $scope.messageStatus = false;
        $scope.clientEmptyForm = false;
        $scope.cientInSys = false;
        
        $scope.check = function () {
            $http({
                method: 'GET',
                url: '/api/ClientInfoes/' + $scope.ipn
            }).then(function successCallback(response) {
                $scope.clientInfo = response.data;
                $scope.message = "Клієнта знайдено";
                $scope.messageStatus = true;
                $scope.cientInSys = true;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                $scope.message = "Клієнта не знайдено";
                $scope.messageStatus = true
                $scope.clientEmptyForm = true;

                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }*/
    });

}(angular.module("DepositeApp"))); 