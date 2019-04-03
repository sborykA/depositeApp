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
            updateClientInfo: function (clientInfo) {
                console.log(clientInfo);
                console.log(clientInfo.Id);
                return $http.put("/api/ClientInfoes/" + clientInfo.Id, clientInfo);
            },
            updateClientInfo: function (user) {
                return $http.put("/api/ClientInfoes", user);
            }
            
        }
    });
}(angular.module("DepositeApp"))); 