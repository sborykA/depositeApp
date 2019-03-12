(function (app) {
    app.factory('clientOperationService', function ($http) {
        return {
            checkClient: function (ipn) {
                return $http.get("/api/ClientInfoes", { params: { ipn: ipn } });
            },
             sendClientInfo: function (user) {
                return $http.post("/api/ClientInfoes", user);
            },
            updateClientInfo: function (user) {
                return $http.put("/api/ClientInfoes", user);
            }
            
        }
        /*this.checkClient = function (ipn) {
            return $http.get("/api/ClientInfoes/" + ipn);
        }*/
    });
}(angular.module("DepositeApp"))); 