(function () {
    'use strict';
    angular
        .module('VideoApp')
        .service('authService', authService);

    authService.$inject = ['Auth'];

    function authService(Auth) {
        var signup = function(email, password) {
            return Auth.$createUserWithEmailAndPassword(email, password);
        }

        var signout = function() {
            return Auth.$signOut();
        }

        var signin = function(email, password) {
            return Auth.$signInWithEmailAndPassword(email, password);
        }

        return {
            signup: signup,
            signout: signout,
            signin: signin
        };
    }
})();
