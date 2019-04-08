(function (app) {
    app.directive('popUpMsg', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'AcceptD.html' ,
            controller: function ($scope,$location,depositeDataService) {
                $scope.changeStatus = function (deposite) {
                    deposite.AcceptionDate = new Date();
                    deposite.ClientInfoId = deposite.ClientInfo.Id;
                    deposite.DepositeInfoId = deposite.DepositeInfo.Id;
                    deposite.DepositeInfo = null;
                    deposite.ClientInfo = null;
                    deposite.Status = "accepted";
                    console.log(deposite);
                    depositeDataService.updateDeposite(deposite)
                        .then(function successCallback(response) {
                            $scope.message = "Дані оновлено";
                            $scope.closePopUp();
                            $scope.reloadData();
                            $scope.reloadCTDepositesData();
                            $scope.reloadNotAcceptedDeposites();
                        }, function errorrCallback() {
                            $scope.message = "Помилка запису";
                        });
                }
                $scope.rejectDeposite = function (deposite) {
                    deposite.ClientInfoId = deposite.ClientInfo.Id;
                    deposite.DepositeInfoId = deposite.DepositeInfo.Id;
                    deposite.DepositeInfo = null;
                    deposite.ClientInfo = null;
                    deposite.Status = "notAccepted";
                    console.log(deposite);
                    depositeDataService.updateDeposite(deposite)
                        .then(function successCallback(response) {
                            $scope.message = "Дані оновлено";
                            $scope.closePopUp();
                            $scope.reloadData();
                            $scope.reloadCTDepositesData();
                            $scope.reloadNotAcceptedDeposites();
                        }, function errorrCallback() {
                            $scope.message = "Помилка запису";
                        });
                }
                $scope.closePopUp = function () {
                    $scope.showPopUpMsg = false;
                }
            }
        }
    });      
}(angular.module("DepositeApp"))); 