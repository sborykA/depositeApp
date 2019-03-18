(function (app) {
    app.factory('depositeDataService', function ($http) {
        return {
            getUnacceptedDeposites: function () {
                return $http.get("/api/Deposites");
            },
            saveDeposite: function (deposite) {
                return $http.post("/api/Deposites", deposite);

            },
            //should change
            updateDeposite: function (deposite) {
                return $http.put("/api/Deposites/" + deposite.DepositeId, deposite);
            }

        }
    });
}(angular.module("DepositeApp"))); 