(function (authorizationModule) {
    authorizationModule.factory('userDataService', function ($http) {
        return {
            checkUser: function (login, pass) {
                return $http.get("/api/Users", { params: { login: login, password: pass } });
            }
        }
    });
}(angular.module("authorizationModule"))); 