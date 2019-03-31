(function (app) {
    app.factory('depositeDataService', function ($http) {
        return {
            getUnacceptedDeposites: function () {
                return $http.get("/api/Deposites");
            },
            saveDeposite: function (deposite) {
                return $http.post("/api/Deposites", deposite);
            },
            getlAllDeposites: function () {
                return $http.get("/api/Deposites/AllDeposites");
            },
            updateDeposite: function (deposite) {
                return $http.put("/api/Deposites/" + deposite.DepositeId, deposite);
            },
            getCreatedTodayDeposites: function (date) {
                return $http.get("/api/Deposites/CreatedTodayDeposites/", { params: { date: date } } );
            },
            getConfirmedTodayDeposites: function (date) {
                return $http.get("/api/Deposites/ConfirmedTodayDeposites/", { params:{ date: date } });
            },
            getAcceptedDeposites: function () {
                return $http.get("/api/Deposites/AcceptedDeposites/");
            },
            getGeneratedStatement: function (id) {
                return $http.get("/api/Deposites/GeneratedStatement/",{ params: { id: id } });
            },
            getGeneratedContract: function (id) {
                return $http.get("/api/Deposites/GeneratedСontract/", { params: { id: id } });
            },
            getGeneratedСlientForm: function (id) {
                return $http.get("/api/Deposites/GeneratedСlientForm/",{ params: { id: id } });
            },
            getStatistics: function () {
                return $http.get("/api/Deposites/Statistics/");
            }

        }
    });
}(angular.module("DepositeApp"))); 