(function() {
    'use strict';
    angular
        .module('VideoApp')
        .directive('navbar', navbar);

    function navbar() {
        return {
            templateUrl: 'views/shared/navbar.html',
            controller: "authController",
            controllerAs: 'vm'
        }
    }
})();
