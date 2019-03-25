(function (app) {
    app.directive('editionOfDeposite', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'editD.html',
            controller: function ($scope, $location, depositeDataService) {
                $scope.editDeposite = function (isValid,deposite) {
                    deposite.ClientInfoId = deposite.ClientInfo.Id;
                    deposite.DepositeInfoId = deposite.DepositeInfo.Id;
                    deposite.DepositeInfo = null;
                    deposite.ClientInfo = null;
                    deposite.Status = false;
                    console.log(deposite);
                    depositeDataService.updateDeposite(deposite)
                        .then(function successCallback(response) {
                            $scope.message = "Дані оновлено";
                            $scope.closeEditionOfDeposite();
                            $scope.reloadData();
                            $scope.reloadCTDepositesData();
                        }, function errorrCallback() {
                            $scope.message = "Помилка запису";
                        });
                }
                $scope.closeEditionOfDeposite = function () {
                    $scope.showEditionOfDeposite = false;
                }
            }
        }
    });
}(angular.module("DepositeApp"))); 