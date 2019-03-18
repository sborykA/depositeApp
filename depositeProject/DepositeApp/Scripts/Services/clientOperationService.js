(function (app) {
    app.factory('clientOperationService', function ($http) {
        return {
            checkClient: function (identificationCode) {
                if (identificationCode != "") {
                    return $http.get("/api/ClientInfoes", { params: { identificationCode: identificationCode } });
                }
            },
             sendClientInfo: function (user) {
                return $http.post("/api/ClientInfoes", user);
            },
            updateClientInfo: function (user) {
                return $http.put("/api/ClientInfoes", user);
            }
            
        }
    });
}(angular.module("DepositeApp"))); 