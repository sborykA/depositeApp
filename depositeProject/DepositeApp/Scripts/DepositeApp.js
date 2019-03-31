(function () {
    'use strict';

    var app = angular.module('DepositeApp', ["ngRoute", "authorizationModule","chart.js"]);
    var config = function ($routeProvider) {
        $routeProvider
            .when("/login",
                { templateUrl: "/DepositeApp/Views/login.html", controller: "loginController" })
            .when("/clientDeclaration",
                { templateUrl: "/DepositeApp/Views/clientDeclaration.html", controller: "clientDeclarationController" })
            .when("/acceptDepositInformation",
            { templateUrl: "/DepositeApp/Views/acceptDepositeInformation.html", controller: "acceptDepositeInformationController" })
            .otherwise(
            { redirectTo: "/login", controller: "loginController" });
    };

    app.config(config);  
})();