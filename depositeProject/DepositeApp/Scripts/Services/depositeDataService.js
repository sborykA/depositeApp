(function (app) {
    app.factory('depositeDataService', function ($http) {
        //change api's
        /*
        return {
            getUnacceptedDeposites: function () {
                return $http.get("/api/Deposites", { params: { status: false } });
            },
            sendClientInfo: function (deposite) {
                return $http.post("/api/Deposites", deposite);
            },
            updateClientInfo: function (deposite) {
                return $http.put("/api/Deposites", deposite);
            }

        }*/
    });
}(angular.module("DepositeApp"))); 