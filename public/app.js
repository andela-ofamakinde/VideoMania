(function(){
    'use strict';
    angular.module('VideoApp', ['ui.router', 'jtt_youtube', 'toastr']);

    function config($urlRouterProvider, $stateProvider, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/embed/*'
        ]);

        $urlRouterProvider.otherwise('/videos');

        var homeSettings = {
            url: '/videos',
            templateUrl: 'views/video.view.html',
            controller: 'videoController',
            controllerAs: 'vm'
        };

        $stateProvider
            .state('videos', homeSettings)
        };

    angular.module('VideoApp')
        .config(['$urlRouterProvider', '$stateProvider', '$sceDelegateProvider', config]);
})();
