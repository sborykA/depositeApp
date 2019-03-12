(function (authorizationModule) {
    authorizationModule.factory('authorizationFactory', ['$userProvider', 'userDataService'/*,'checkRolesService'*/,
        function ($userProvider, userDataService/*, checkRolesService*/) {
        //var accountInfo = {};
        
            var login = function (login, pass) {
                /*console.log(checkRolesService.checkRole(login, pass));
                return checkRolesService.checkRole(login, pass);*/
            
            
            /*var res = {};
            //Не возвращает обьект res
            
            userDataService.checkUser(login, pass)
                .then(function successCallback(response) {
                    accountInfo = response.data;
                    if (accountInfo.Type.toLowerCase() == 'front') {
                        $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Front] });
                    } else if (accountInfo.Type.toLowerCase() == 'back') {
                        $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Back] });
                    }
                    res = {
                        status: true,
                        type: $userProvider.getUser().Roles
                    };
                    
                }, function errorCallback(response) {
                    res = {
                        status: false,
                        type: ""
                    };
                    
                });
            console.log(res);
            return res;
           */
            
            
            if (pass !== '123456') {
                return false;
            }
            if (login === 'front') {
                $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Front] });
            } else {
                $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Back] });
            }
            return {
                status: true,
                type: $userProvider.getUser().Roles
            };
        }
            return {
                login: login,
            }
        
    }]);
}(angular.module("authorizationModule")));