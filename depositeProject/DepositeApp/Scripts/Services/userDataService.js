(function (authorizationModule) {
    authorizationModule.factory('userDataService', function ($http) {
        return {
            checkUser: function (login, pass) {
                return $http.get("/api/Users1", { params: { login: login, password: pass } });
            }
        }
        /*this.checkClient = function (ipn) {
            return $http.get("/api/ClientInfoes/" + ipn);
        }*/
    });
}(angular.module("authorizationModule"))); 