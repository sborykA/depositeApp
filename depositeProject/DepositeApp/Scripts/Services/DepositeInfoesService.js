(function (app) {
    app.factory('depositeInfoesService', function ($http) {
        return {
            getInfoes: function () {
                return $http.get("/api/DepositeInfoes");
            }
        }
        /*this.checkClient = function (ipn) {
            return $http.get("/api/ClientInfoes/" + ipn);
        }*/
    });
}(angular.module("DepositeApp"))); 