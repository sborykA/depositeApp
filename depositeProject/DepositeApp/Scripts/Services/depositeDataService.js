(function (app) {
    app.factory('depositeDataService', function ($http) {
        return {
            getUnacceptedDeposites: function () {
                return $http.get("/api/Deposites");
            },
            saveDeposite: function (deposite) {
                return $http.post("/api/Deposites", deposite);

            },
            updateDeposite: function (deposite) {
                return $http.put("/api/Deposites/" + deposite.DepositeId, deposite);
            }

        }
    });
}(angular.module("DepositeApp"))); 