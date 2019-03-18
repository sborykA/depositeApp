(function (app) {
    app.directive('popUpMsg', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'AcceptD.html' ,
            controller: function ($scope) {
                $scope.closePopUp = function () {
                    $scope.showPopUpMsg = false;
                }
            }
        }
    });      
}(angular.module("DepositeApp"))); 