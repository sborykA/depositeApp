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

        /*$http({
            method: 'GET',
            url: '/api/Users1'
        }).then(function successCallback(response) {
            $scope.users = response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });*/
    });

    
}(angular.module("DepositeApp"))); 