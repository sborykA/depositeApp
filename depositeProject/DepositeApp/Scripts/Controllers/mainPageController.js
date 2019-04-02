(function (app) {
    app.controller('mainPageController',
        ['$scope', 'authorizationFactory', '$location','$userProvider',
            function ($scope, authorizationFactory, $location, $userProvider) {
                //$scope.role = $userProvider.getUser().Roles;
                angular.extend($scope, $userProvider, true);
                $scope.role = $userProvider.getUser().Roles;
                $scope.login = $userProvider.getUser().Login;
                //$scope.showFrontFrame = false;
                //$scope.showBackFrame = false;
                $scope.getFrameType = function () {
                    //$scope.showFrontFrame = false;
                    //$scope.showBackFrame = false;
                    if ($scope.role == 0) {
                        //$scope.showFrontFrame = true;
                        return true;
                        
                    } else if ($scope.role == 1) {
                        //$scope.showBackFrame = true;
                        return false;
                    }
                }
                //---------------------------------
                $(document).ready(function () {
                    $("#sidebar").mCustomScrollbar({
                        theme: "minimal"
                    });

                    $('#sidebarCollapse').on('click', function () {
                        $('#sidebar, #content').toggleClass('active');
                        $('.collapse.in').toggleClass('in');
                        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
                    });
                });
            }]);

}(angular.module("DepositeApp"))); 