(function (authorizationModule) {
authorizationModule.factory('$userProvider', function () {
    var rolesEnum = {
        Front: 0,
        Back: 1
    };
    var setUser = function (u) {
        user = u;
    }
    var getUser = function () {
        return user;
    }

    return {
        getUser: getUser,
        setUser: setUser,
        rolesEnum: rolesEnum
    }
    });
}(angular.module("authorizationModule")));