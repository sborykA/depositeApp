(function (app) {
    app.controller('clientDeclarationController', function ($scope, clientOperationService, depositeInfoesService, depositeDataService) {
        $scope.clientInBase = false;
        function ConvertUTCTimeToLocalTime(UTCDateString) {
            var convertdLocalTime = new Date(UTCDateString);
            var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;
            convertdLocalTime.setHours(convertdLocalTime.getHours() - hourOffset);
            return convertdLocalTime;
        }
        $scope.deposite = {};
        $scope.DepositeInfo = {};
        $scope.showClientSearchForm = true;
        depositeInfoesService.getInfoes()
            .then(function successCallback(response) {
                $scope.depositeInfoes = response.data;
            }, function errorCallback(response) {
            });
        $scope.checkClientType = function (identificationCode) {
            $scope.messageStatus = false;
            $scope.showInputForm = false;
            $scope.cientInSys = false;
            clientOperationService.checkClient(identificationCode)
                .then(function successCallback(response) {
                    $scope.deposite.ClientInfo = response.data;
                    $scope.message = "Клієнта знайдено";
                    $scope.messageStatus = true;
                    $scope.showInputForm = true;
                    $scope.clientInBase = true;
                }, function errorCallback(response) {
                    $scope.deposite.ClientInfo = {};
                    $scope.deposite.ClientInfo.IndentificationCode = identificationCode;
                    $scope.message = "Клієнта не знайдено";
                    $scope.messageStatus = true;
                    $scope.showInputForm = true;
                    $scope.clientInBase = false;
                });
        } 
        $scope.submitDeposite = function (isValid, deposite) {

            deposite.Status = false;
            if ($scope.clientInBase == true) {
                deposite.ClientInfoId = deposite.ClientInfo.Id;
                deposite.ClientInfo = null;
            }
            deposite.DepositeInfoId = deposite.DepositeInfo.Id;
            deposite.DepositeInfo = null;
            depositeDataService.saveDeposite(deposite)
                .then(function successCallback(response) {
                    $scope.deposite = response.data;

                    $scope.deposite.StartDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.StartDepositeDate);
                    $scope.deposite.EndDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.EndDepositeDate);
                    $scope.message = "Депозит збережено";
                    $scope.showPrintForm = true;
                    $scope.showClientSearchForm = false;
                    console.log(deposite);
                    $scope.showInputForm = false;
                }, function errorrCallback() {
                    $scope.message = "Помилка запису";
                });
        }
        
    });

}(angular.module("DepositeApp"))); 