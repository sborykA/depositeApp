(function (app) {
    app.directive('popUpMsg', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'AcceptD.html' ,
            controller: function ($scope,$location,depositeDataService) {
                $scope.changeStatus = function (deposite) {
                    deposite.ClientInfoId = deposite.ClientInfo.Id;
                    deposite.DepositeInfoId = deposite.DepositeInfo.Id;
                    deposite.DepositeInfo = null;
                    deposite.ClientInfo = null;
                    deposite.Status = true;
                    console.log(deposite);
                    depositeDataService.updateDeposite(deposite)
                        .then(function successCallback(response) {
                            /*$scope.deposite = response.data;
                            $scope.deposite.StartDepositeDate = new Date($scope.deposite.StartDepositeDate);
                            $scope.deposite.EndDepositeDate = new Date($scope.deposite.EndDepositeDate);*/
                            $scope.message = "Дані оновлено";
                            $scope.closePopUp();
                            $scope.reloadData();
                            //$location.path('/acceptDepositInformation');
                            
                            
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