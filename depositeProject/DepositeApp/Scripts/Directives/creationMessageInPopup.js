(function (app) {
    app.directive('creationMessageInPopup', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'creationMessageInPopup.html',
            controller: function ($scope, $location, depositeDataService) {
                $scope.closeCreationMessageInPopup = function () {
                    $scope.showCreationMessageInPopup = false;
                }
            }
        }
    });
}(angular.module("DepositeApp"))); 