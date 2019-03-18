(function (app) {
    app.controller('clientDeclarationController', function ($scope, clientOperationService, depositeInfoesService, depositeDataService) {
        $scope.clientInBase = false;
        function isNotEmptyObject(obj) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    return true;
                }
            }
            return false;
        }
        //$scope.depositeInfoes = [];
        $scope.deposite = {};
        $scope.DepositeInfo = {};
        depositeInfoesService.getInfoes()
            .then(function successCallback(response) {
                $scope.depositeInfoes = response.data;

                /*if ($scope.depositeInfoes.length !== 0) {
                    //$scope.message = "Present unaccepted deposites";
                    //$scope.showMessage = false;
                    //$scope.showTable = true;
                } else {
                    //$scope.message = "Epsent unaccepted deposites";
                    //$scope.showMessage = true;
                    //$scope.showTable = false;
                }*/

            }, function errorCallback(response) {

            });
        $scope.checkClientType = function (identificationCode) {
            $scope.messageStatus = false;
            $scope.showInputForm = false;
            $scope.cientInSys = false;
            clientOperationService.checkClient(identificationCode)
                .then(function successCallback(response) {
                    $scope.user = response.data;
                    $scope.deposite.ClientInfo = $scope.user;
                    //$scope.deposite.ClientInfo_id = $scope.user.Id;
                    //move this to deposite
                    /*$scope.deposite.StartDepositeDate = new Date($scope.deposite.StartDepositeDate);
                    $scope.deposite.EndDepositeDate = new Date($scope.deposite.EndDepositeDate);*/
                    $scope.message = "Клієнта знайдено";
                    $scope.messageStatus = true;
                    $scope.showInputForm = true;
                    $scope.clientInBase = true;
                    
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
        function formatDate(date) {
            year = date.getFullYear();
            month = date.getMonth() + 1;
            dt = date.getDate();
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            return dt + "-" + month + "-" + year;
        }
        $scope.saveData = function (deposite) {
            deposite.Status = false;
            if ($scope.clientInBase == true) {
                deposite.ClientInfoId = deposite.ClientInfo.Id;
                deposite.ClientInfo = null;
            }
            deposite.DepositeInfoId = deposite.DepositeInfo.Id;
            deposite.DepositeInfo = null;
            
            //$scope.deposite.StartDepositeDate = formatDate($scope.deposite.StartDepositeDate);
            //$scope.deposite.EndDepositeDate = formatDate($scope.deposite.EndDepositeDate);
            console.log(deposite);
            if ($scope.clientInBase) {
                depositeDataService.saveDeposite(deposite)
                    .then(function successCallback(response) {
                        $scope.deposite = response.data;
                        $scope.deposite.StartDepositeDate = new Date($scope.deposite.StartDepositeDate);
                        $scope.deposite.EndDepositeDate = new Date($scope.deposite.EndDepositeDate);
                        $scope.message = "Дані оновлено";
                        console.log($scope.deposite);
                    }, function errorrCallback() {
                        $scope.message = "Помилка запису";
                    });
            } else {

            }
        }
        /*$scope.saveData = function (user) {
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
             }*/
        
    });

}(angular.module("DepositeApp"))); 