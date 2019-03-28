(function (app) {
    app.controller('acceptDepositeInformationController', function ($scope, depositeDataService, depositeInfoesService) {
        $scope.clientInBase = false;
        $scope.showMessage = false;
        $scope.showTable = false;
        $scope.showConfirmedTable = false;
        
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
            }, function errorCallback(response) { });
        depositeDataService.getConfirmedTodayDeposites(new Date())
            .then(function successCallback(response) {
                $scope.confirmedDeposites = response.data;

                if ($scope.confirmedDeposites.length !== 0) {
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
                    } else {
                        $scope.message1 = "Сьогодні ще не здійснювалися депозити";
                        //$scope.showMessage = true;
                        $scope.showConfirmedTable = false;
                    }
                }, function errorCallback(response) { });
        }
        $scope.showPopUpMsg = false;
        $scope.openPopUp = function (deposite) {
            $scope.showPopUpMsg = true;
            $scope.deposite = deposite;
            $scope.deposite.StartDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.StartDepositeDate);
            $scope.deposite.EndDepositeDate = ConvertUTCTimeToLocalTime($scope.deposite.EndDepositeDate);
        }
        
        $scope.getfrequencySelection = function () {
            $scope.frequencySelection = [];
            let tmpInfoes = [];
            depositeInfoesService.getInfoes()
                .then(function successCallback(response) {
                    tmpInfoes = response.data;
                    console.log("tmpInfoes");
                    console.log(tmpInfoes);
                    for (var depositeInfo in tmpInfoes) {
                        $scope.frequencySelection.pop({depositeTypeName:depositeInfo[Name], frequency:0})
                    }
                    console.log($scope.frequencySelection);
                },function errorCallback(response) { });
            depositeDataService.getlAllDeposites()
                .then(function successCallback(response) {
                $scope.confirmedDeposites = response.data;
                
                let countFirstTypeDeposite = 0;
                let countSecondTypeDeposite = 0;
                for (var deposite in responce.data) {
                    if (deposite[DepositeInfo].Name == "Депозит з можливістю поповнення") {
                        countFirstTypeDeposite++;
                    }
                    if (deposite[DepositeInfo].Name == "Депозит з можливістю поповнення") {
                        countSecondTypeDeposite++;
                    }
                    }
                    const depositesCount = responce.data.length;
                    $scope.frequencySelection[0].frequency = countFirstTypeDeposite / depositesCount;
                    $scope.frequencySelection[2].frequency = countSecondTypeDeposite / depositesCount;
                    console.log("frequencyInfoes");
                    
                    console.log($scope.frequencySelection);
            }, function errorCallback(response) { });
        }
    });

}(angular.module("DepositeApp"))); 