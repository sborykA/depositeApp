(function (securityModule) {
    securityModule.factory('$pagesSecurityService', ['$userProvider', '$location',
        function ($userProvider, $location) {

            var checkAuthorize = function (path) {
                if ($userProvider.getUser() == null) {
                    $location.path('/login');
                }
                switch (path) {
                    //запрещенный ресурс
                    case '/clientDeclaration':
                        return checkPageSecurity({
                            //роли текущего пользователя
                            UserRoles: $userProvider.getUser().Roles,
                            //роли, которым доступен ресурс
                            AvailableRoles: [
                                $userProvider.rolesEnum.Front
                            ]
                        });
                    case '/acceptDepositeInformation':
                        return checkPageSecurity({
                            //роли текущего пользователя
                            UserRoles: $userProvider.getUser().Roles,
                            //роли, которым доступен ресурс
                            AvailableRoles: [
                                $userProvider.rolesEnum.Back
                            ]
                        });
                    default:
                        return true;
                }
            };

            var checkPageSecurity = function (config) {
                var authorize = false;
                for (var i in config.UserRoles) {
                    if ($.inArray(config.UserRoles[i], config.AvailableRoles) == -1) {
                        authorize = false;
                    } else {
                        authorize = true;
                        break;
                    }
                }
                return authorize;
            };

            return {
                checkAuthorize: checkAuthorize,
            };
        }]);
}(angular.module("securityModule"))); 