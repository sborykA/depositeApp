(function (app) {
    app.controller('acceptDepositeInformationController', function ($scope, /*depositeDataService*/) {
        $scope.clientInBase = false;
        $scope.showMessage = false;
        $scope.showTable = false;
        /*depositeDataService.getUnacceptedDeposites()
            .then(function successCallbacl(response) {
                $scope.deposites = response.data;
                $scope.message = "Present unaccepted deposites";
                $scope.showMessage = false;
                $scope.showTable = true;
            }, function errorCallback(response) {
                $scope.message = "Epsent unaccepted deposites";
                $scope.showMessage = true;
                $scope.showTable = false;

            });*/
    });

}(angular.module("DepositeApp"))); 