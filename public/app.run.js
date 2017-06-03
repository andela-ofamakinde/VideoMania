(function () {
  'use strict';
    angular
        .module('VideoApp')
        .run(run);

    run.$inject = ["$rootScope", "$state"];

    function run($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go("home");
            }
        });
    }
})();
