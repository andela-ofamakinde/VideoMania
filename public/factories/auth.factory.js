(function () {
    'use strict';
    angular
        .module('VideoApp')
        .factory("Auth", ["$firebaseAuth",
            function($firebaseAuth) {
                return $firebaseAuth();
            }
    ]);
})();
