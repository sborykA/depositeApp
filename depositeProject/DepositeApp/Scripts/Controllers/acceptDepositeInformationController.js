(function (app) {
    app.controller('acceptDepositeInformationController', function ($scope, depositeDataService) {
        $scope.clientInBase = false;
        $scope.showMessage = false;
        $scope.showTable = false;
        
        function ConvertUTCTimeToLocalTime(UTCDateString) {
            var convertdLocalTime = new Date(UTCDateString);
            var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;
            convertdLocalTime.setHours(convertdLocalTime.getHours() - hourOffset);
            return convertdLocalTime;
        }
        depositeDataService.getUnacceptedDeposites()
            .then(function successCallback(response) {
                $scope.deposites = response.data;
                
                if ($scope.deposites.length!==0) {
                    $scope.message = "Наявні непідтверджені депозити";
                    $scope.showMessage = false;
                    $scope.showTable = true;
                } else {
                    $scope.message = "Відстуні непідтверджені дупозити";
                    $scope.showMessage = true;
                    $scope.showTable = false;
                }
            }, function errorCallback(response) {});
        $scope.reloadData = function () {
            depositeDataService.getUnacceptedDeposites()
                .then(function successCallback(response) {
                    $scope.deposites = response.data;
                    if ($scope.deposites.length !== 0) {
                        $scope.message = "Наявні непідтверджені депозити";
                        $scope.showMessage = false;
                        $scope.showTable = true;
                    } else {
                        $scope.message = "Відстуні непідтверджені дупозити";
                        $scope.showMessage = true;
                        $scope.showTable = false;
                    }
                }, function errorCallback(response) {});
        }
        $scope.showPopUpMsg = false;
        $scope.openPopUp = function (deposite) {
            $scope.showPopUpMsg = true;
            $scope.deposite = deposite;
            $scope.deposite.StartDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.StartDepositeDate);
            $scope.deposite.EndDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.EndDepositeDate);
        }
    });

}(angular.module("DepositeApp"))); 