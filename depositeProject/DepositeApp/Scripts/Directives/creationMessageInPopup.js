(function (app) {
    app.directive('creationMessageInPopup', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'creationMessageInPopup.html',
            controller: function ($scope) {
                $scope.closeCreationMessageInPopup = function () {
                    $scope.showCreationMessageInPopup = false;
                    console.log("used");
                }
            }
        }
    });
}(angular.module("DepositeApp"))); 