(function (app) {
    app.controller('clientDeclarationController', function ($scope, clientOperationService) {
        $scope.clientInBase = false;
        $scope.checkClientType = function (identificationCode) {
            $scope.messageStatus = false;
            $scope.showInputForm= false;
            $scope.cientInSys = false;
            
            $scope.deposite = {};
            clientOperationService.checkClient(identificationCode)
                .then(function successCallback(response) {
                    $scope.deposite.user = response.data;
                    //move this to deposite
                    /*$scope.deposite.StartDepositeDate = new Date($scope.deposite.StartDepositeDate);
                    $scope.deposite.EndDepositeDate = new Date($scope.deposite.EndDepositeDate);*/
                    $scope.message = "Клієнта знайдено";
                    $scope.messageStatus = true;
                    $scope.showInputForm = true;
                    $scope.clientInBase = true;
                    console.log($scope.deposite.user);
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
    });

}(angular.module("DepositeApp"))); 