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
            },
            getCreatedTodayDeposites: function (date) {
                return $http.get("/api/Deposites/CreatedTodayDeposites/",  date );
            },
            getConfirmedTodayDeposites: function (date) {
                return $http.get("/api/Deposites/ConfirmedTodayDeposites/", { params:{ date: date } });
            }

        }
    });
}(angular.module("DepositeApp"))); 