(function (app) {
    app.directive('creationMessage', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'creationMessage.html',
            controller: function ($scope, $location, depositeDataService) {
                $scope.closeCreationMessage = function () {
                    $scope.showCreationMessage = false;
                }
            }
        }
    });
}(angular.module("DepositeApp"))); 