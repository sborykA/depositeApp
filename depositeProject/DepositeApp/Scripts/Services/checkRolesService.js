(function (authorizationModule) {
    authorizationModule.factory('checkRolesService', '$userProvider', 'userDataService', function ($userProvider, userDataService) {
        return {
            checkRole: function (login, pass) {
                //Check method
                 userDataService.checkUser(login, pass)
                    .then(function successCallback(response) {
                        accountInfo = response.data;
                        if (accountInfo.Type.toLowerCase() == 'front') {
                            $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Front] });
                        } else if (accountInfo.Type.toLowerCase() == 'back') {
                            $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Back] });
                        }
                        return {
                            status: true,
                            type: $userProvider.getUser().Roles
                        };

                    }, function errorCallback(response) {
                        return {
                            status: false,
                            type: ""
                        };
                    });
            }
        }

        /*this.checkClient = function (ipn) {
            return $http.get("/api/ClientInfoes/" + ipn);
        }*/
    });
}(angular.module("authorizationModule"))); 