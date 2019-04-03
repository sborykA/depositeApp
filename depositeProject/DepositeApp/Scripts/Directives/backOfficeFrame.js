(function (app) {
    app.directive('backOfficeFrame', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'acceptDepositeInformation.html',
            controller: function ($scope, depositeDataService) {
                $scope.clientInBase = false;
                $scope.showMessage = false;
                $scope.showTable = false;
                $scope.showConfirmedTable = false;
                $scope.showPie = false;
                function ConvertUTCTimeToLocalTime(UTCDateString) {
                    var convertdLocalTime = new Date(UTCDateString);
                    var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;
                    convertdLocalTime.setHours(convertdLocalTime.getHours() - hourOffset);
                    return convertdLocalTime;
                }
                /*$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
                $scope.data = [300, 500, 100];*/
                /*var oilCanvas = document.getElementById("oilChart");
        
                Chart.defaults.global.defaultFontFamily = "Lato";
                Chart.defaults.global.defaultFontSize = 18;
        
                var oilData = {
                    labels: [
                        "Saudi Arabia",
                        "Russia",
                        "Iraq",
                        "United Arab Emirates",
                        "Canada"
                    ],
                    datasets: [
                        {
                            data: [133.3, 86.2, 52.2, 51.2, 50.2],
                            backgroundColor: [
                                "#FF6384",
                                "#63FF84",
                                "#84FF63",
                                "#8463FF",
                                "#6384FF"
                            ]
                        }]
                };
        
                var pieChart = new Chart(oilCanvas, {
                    type: 'pie',
                    data: oilData
                });*/
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
                    }, function errorCallback(response) { });
                depositeDataService.getConfirmedTodayDeposites(new Date())
                    .then(function successCallback(response) {
                        $scope.confirmedDeposites = response.data;

                        if ($scope.confirmedDeposites.length !== 0) {
                            $scope.getTotalIncome();
                            $scope.message1 = "Сьогодні вже здійснювалися депозити";
                            //$scope.showMessage = false;
                            $scope.showConfirmedTable = true;
                        } else {
                            $scope.message1 = "Сьогодні ще не здійснювалися депозити";
                            //$scope.showMessage = true;
                            $scope.showConfirmedTable = false;
                        }
                    }, function errorCallback(response) { });

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
                        }, function errorCallback(response) { });
                }
                $scope.reloadCTDepositesData = function () {
                    depositeDataService.getConfirmedTodayDeposites(new Date())
                        .then(function successCallback(response) {
                            $scope.confirmedDeposites = response.data;
                            if ($scope.confirmedDeposites.length !== 0) {
                                $scope.message1 = "Сьогодні вже здійснювалися депозити";
                                //$scope.showMessage = false;
                                $scope.showConfirmedTable = true;
                                $scope.getTotalIncome();
                            } else {
                                $scope.message1 = "Сьогодні ще не здійснювалися депозити";
                                //$scope.showMessage = true;
                                $scope.showConfirmedTable = false;
                            }
                        }, function errorCallback(response) { });
                }
                $scope.incomeInUSD = 0;
                $scope.incomeInEURO = 0;
                $scope.incomeInUAH = 0;
                $scope.getTotalIncome = function () {
                    $scope.incomeInUSD = 0;
                    $scope.incomeInEURO = 0;
                    $scope.incomeInUAH = 0;
                    for ( var confirmedDepositeId in $scope.confirmedDeposites) {   
                        var confirmedDeposite = $scope.confirmedDeposites[confirmedDepositeId];
                            if (confirmedDeposite.Currency == "UAH") {
                                $scope.incomeInUAH += confirmedDeposite.AmountOfDeposite;
                            } else if (confirmedDeposite.Currency == "USD") {
                                $scope.incomeInUSD += confirmedDeposite.AmountOfDeposite;
                            } else if (confirmedDeposite.Currency == "EURO") {
                                $scope.incomeInEURO += confirmedDeposite.AmountOfDeposite;
                            }  
                    }
                }
                $scope.showPopUpMsg = false;
                $scope.openPopUp = function (deposite) {
                    $scope.showPopUpMsg = true;
                    $scope.deposite = deposite;
                    $scope.deposite.StartDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.StartDepositeDate);
                    $scope.deposite.EndDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.EndDepositeDate);
                }

                $scope.getfrequencySelection = function () {
                    $scope.showPie = true;
                    depositeDataService.getStatistics()
                        .then(function successCallback(response) {
                            $scope.labels = response.data.Labels;
                            $scope.data = response.data.Data;
                        }, function errorCallback(response) { });

                }
            }

        }
    });
}(angular.module("DepositeApp"))); 