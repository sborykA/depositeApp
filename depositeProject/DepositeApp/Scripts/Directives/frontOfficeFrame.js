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
                //angular.extend($scope, $userProvider, true);
                //$scope.login = $userProvider.getUser().Login;
                function ExportToPDF(data) {
                    //base64 To ArrayBuffer
                    var binaryString = window.atob(data.split(',')[1]);
                    var binaryLen = binaryString.length;
                    var bytes = new Uint8Array(binaryLen);
                    for (var i = 0; i < binaryLen; i++) {
                        var ascii = binaryString.charCodeAt(i);
                        bytes[i] = ascii;
                    }
                    //-------
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
                    link.download = "User.pdf";
                    link.click();
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
                /*$scope.clientInBase = false;
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
                    deposite.AcceptionDate = new Date(1754,0,1)
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
                            $scope.message = "Депозит збережено";
                            $scope.showPrintForm = true;
                            $scope.showClientSearchForm = false;
                            console.log(deposite);
                            $scope.showInputForm = false;
                        }, function errorrCallback() {
                            $scope.message = "Помилка запису";
                        });
                }*/
                $scope.showCreationOfDeposite = false;
                $scope.showEditionOfDeposite = false;
                $scope.openCreationOfDeposite = function () {
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