(function (app) {
    app.factory('depositeDataService', function ($http) {
        //change api's
        
        return {
            getUnacceptedDeposites: function () {
                return $http.get("/api/Deposites");
            },
            //should change
            saveDepositeInfo: function (deposite) {
                return $http.post("/api/Deposites", deposite);
            },
            //should change
            updateDeposite: function (deposite) {
                return $http.put("/api/Deposites", deposite);
            }

        }
    });
}(angular.module("DepositeApp"))); 