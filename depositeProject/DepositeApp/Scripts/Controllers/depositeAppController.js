(function (app) {
    app.controller('depositeAppController', '$location', '$userProvider', '$pagesSecurityService',
        function ($scope, $location, $userProvider, $pagesSecurityService) {
        $scope.goTo = function (path) {
            $location.path(path);
        }
            angular.extend($scope, $userProvider, true);
            //Разобраться
            $scope.$on('$locationChangeStart', function (event, nextUrl, prevUrl) {
                if ($location.path() != '/login' || nextUrl.indexOf('login') == -1) {
                    if (!$pagesSecurityService.checkAuthorize($location.path())) {
                        alert('Access denied!');
                        $location.path(prevUrl.split('#')[1]);
                    }
                }
            });
    });

    
}(angular.module("DepositeApp"))); 