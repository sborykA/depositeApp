(function (authorizationModule) {
    authorizationModule.factory('authorizationFactory', ['$userProvider', 'userDataService',
        function ($userProvider, userDataService) {
        
            var login = function (login, pass,redirect) {
            userDataService.checkUser(login, pass)
                .then(function successCallback(response) {
                    accountInfo = response.data;
                    if (accountInfo.Type.toLowerCase() == 'front') {
                        $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Front] });
                    } else if (accountInfo.Type.toLowerCase() == 'back') {
                        $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Back] });
                    }
                    redirect(true, $userProvider.getUser().Roles);
                    
                    
                }, function errorCallback(response) {
                    redirect(false);                 
                });
         
            }
            return {
                login: login,
            }
        
    }]);
}(angular.module("authorizationModule")));