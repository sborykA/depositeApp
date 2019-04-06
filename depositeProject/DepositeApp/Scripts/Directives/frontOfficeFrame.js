(function (app) {
    app.directive('frontOfficeFrame', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'clientDeclaration.html',
            controller: function ($scope, clientOperationService, depositeInfoesService, depositeDataService, $userProvider) {
                function ConvertUTCTimeToLocalTime(UTCDateString) {
                    var convertdLocalTime = new Date(UTCDateString);
                    var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;
                    convertdLocalTime.setHours(convertdLocalTime.getHours() - hourOffset);
                    return convertdLocalTime;
                }
               
                depositeDataService.getAcceptedDeposites()
                    .then(function successCallback(response) {
                        $scope.deposites = response.data;

                        if ($scope.deposites.length !== 0) {
                            $scope.message = "Наявні підтверджені депозити";
                            $scope.showMessage = false;
                            $scope.showTable = true;
                        } else {
                            $scope.message = "Відстуні підтверджені дупозити";
                            $scope.showMessage = true;
                            $scope.showTable = false;
                        }
                    }, function errorCallback(response) { });
                depositeDataService.getCreatedTodayDeposites(new Date())
                    .then(function successCallback(response) {
                        $scope.createdDeposites = response.data;

                        if ($scope.createdDeposites.length !== 0) {
                            $scope.message1 = "Сьогодні вже створювались депозити";
                            console.log($scope.createdDeposites);
                            //$scope.showMessage = false;
                            $scope.showCreatedTable = true;
                        } else {
                            $scope.message1 = "Сьогодні ще не створювалися депозити";
                            //$scope.showMessage = true;
                            $scope.showCreatedTable = false;
                        }
                    }, function errorCallback(response) { });

                $scope.reloadData = function () {
                    depositeDataService.getAcceptedDeposites()
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
                        }, function errorCallback(response) { });
                }
                $scope.reloadCTDepositesData = function () {
                    depositeDataService.getCreatedTodayDeposites(new Date())
                        .then(function successCallback(response) {
                            $scope.createdDeposites = response.data;
                            if ($scope.createdDeposites.length !== 0) {
                                $scope.message1 = "Сьогодні вже створювались депозити";
                                //$scope.showMessage = false;
                                $scope.showCreatedTable = true;
                            } else {
                                $scope.message1 = "Сьогодні ще не створювалися депозити";
                                //$scope.showMessage = true;
                                $scope.showCreatedTable = false;
                            }
                        }, function errorCallback(response) { });
                }
               
                $scope.showCreationOfDeposite = false;
                $scope.showEditionOfDeposite = false;
                
                $scope.openCreationOfDeposite = function () {
                    $scope.showInputForm = false;
                    $scope.messageStatus = false;
                    $scope.showPrintForm = false;
                    

                    $scope.showCreationOfDeposite = true;

                }
                $scope.generatePDF = function (id) {
                    depositeDataService.getGeneratedContract(id)
                        .then(function successCallback(response) {
                        }, function errorCallback(response) { });
                }
                $scope.openEditionOfDeposite = function (deposite) {
                    $scope.showEditionOfDeposite = true;
                    $scope.deposite = deposite;
                    $scope.deposite.StartDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.StartDepositeDate);
                    $scope.deposite.EndDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.EndDepositeDate);

                }
                $scope.showCreationMessage = false;
                $scope.openCreationMessage = function () {
                    $scope.showCreationMessage = true;
                }
                
            }
        }
    });
}(angular.module("DepositeApp"))); 