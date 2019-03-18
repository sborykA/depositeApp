(function (app) {
    app.controller('acceptDepositeInformationController', function ($scope, depositeDataService) {
        $scope.clientInBase = false;
        $scope.showMessage = false;
        $scope.showTable = false;
        
        depositeDataService.getUnacceptedDeposites()
            .then(function successCallback(response) {
                $scope.deposites = response.data;
                
                if ($scope.deposites.length!==0) {
                    $scope.message = "Present unaccepted deposites";
                    $scope.showMessage = false;
                    $scope.showTable = true;
                } else {
                    $scope.message = "Epsent unaccepted deposites";
                    $scope.showMessage = true;
                    $scope.showTable = false;
                }
                
               
            }, function errorCallback(response) {
            });
        $scope.reloadData = function () {
            depositeDataService.getUnacceptedDeposites()
                .then(function successCallback(response) {
                    $scope.deposites = response.data;
                    if ($scope.deposites.length !== 0) {
                        $scope.message = "Present unaccepted deposites";
                        $scope.showMessage = false;
                        $scope.showTable = true;
                    } else {
                        $scope.message = "Epsent unaccepted deposites";
                        $scope.showMessage = true;
                        $scope.showTable = false;
                    }
                }, function errorCallback(response) {
                });
        }
        $scope.showPopUpMsg = false;
        $scope.openPopUp = function (deposite) {
            $scope.showPopUpMsg = true;
            $scope.deposite = deposite;
            $scope.deposite.StartDepositeDate = new Date($scope.deposite.StartDepositeDate);
            $scope.deposite.EndDepositeDate = new Date($scope.deposite.EndDepositeDate);
        }
    });

}(angular.module("DepositeApp"))); 