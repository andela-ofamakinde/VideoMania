(function () {
    'use strict';
    angular
        .module('VideoApp')
        .service('authService', authService);

    authService.$inject = ['Auth', '$window'];

    function authService(Auth, $window) {
        var signup = function(email, password) {
            return Auth.$createUserWithEmailAndPassword(email, password);
        }

        var signout = function() {
            return Auth.$signOut();
        }

        var signin = function(email, password) {
            return Auth.$signInWithEmailAndPassword(email, password);
        }

        var currentUser = function(uid) {
            $window.localStorage['current_user'] = uid;
        }

        var getCurrentUser = function() {
            return $window.localStorage['current_user'];
        }

        return {
            signup: signup,
            signout: signout,
            signin: signin,
            currentUser: currentUser,
            getCurrentUser: getCurrentUser
        };
    }
})();
