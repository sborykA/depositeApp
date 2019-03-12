(function (authorizationModule) {
    authorizationModule.factory('authorizationFactory', ['$userProvider', 'userDataService', 'localStorageService',
    function ($userProvider,userDataService,localStorageService) {
        var accountInfo = {};
        
        var login = function (login, pass) {
            //Не возвращает обьект
            /*userDataService.checkUser(login, pass)
                .then(function successCallback(response) {
                    console.log(response.data);
                    accountInfo = response.data;
                }, function errorCallback(response) {
                    return false;
                });
            
           
            console.log(accountInfo);
            if (accountInfo.Type.toLowerCase() === 'front') {
                $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Front] });
            } else if (accountInfo.Type.toLowerCase() === 'back') {
                $userProvider.setUser({ Login: login, Roles: [$userProvider.rolesEnum.Back] });
            }
            return true;*/
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