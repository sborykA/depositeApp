(function (app) {
    app.factory('depositeInfoesService', function ($http) {
        return {
            getInfoes: function () {
                return $http.get("/api/DepositeInfoes");
            }
        }
    });
}(angular.module("DepositeApp"))); 