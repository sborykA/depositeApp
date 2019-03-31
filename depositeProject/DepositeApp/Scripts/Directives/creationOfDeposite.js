(function (app) {
    app.directive('creationOfDeposite', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'createD.html',
            controller: function ($scope, $location, depositeDataService,clientOperationService,depositeInfoesService) {
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
                    deposite.CreationDate = new Date();
                    deposite.AcceptionDate = new Date(1754, 0, 1)
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
                            $scope.deposite.CreationDate = ConvertUTCTimeToLocalTime($scope.deposite.CreationDate);
                            $scope.messageStatusCreation = "Депозит збережено";
                            $scope.showPrintForm = true;
                            $scope.showClientSearchForm = false;
                            $scope.showInputForm = false;
                            
                            $scope.reloadData();
                            $scope.reloadCTDepositesData();
                            console.log($scope.deposite);
                            
                        }, function errorrCallback() {
                            $scope.messageStatusCreation = "Помилка запису";
                        });
                }
                $scope.closeCreationOfDeposite = function () {
                    $scope.showCreationOfDeposite = false;
                }
            }
        }
    });
}(angular.module("DepositeApp"))); 