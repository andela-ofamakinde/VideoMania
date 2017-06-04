(function(){
    'use strict';
    angular.module('VideoApp', ['ui.router', 'jtt_youtube', 'toastr', 'firebase']);

    function config($urlRouterProvider, $stateProvider, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/embed/*'
        ]);

        $urlRouterProvider.otherwise('/home');

        var homeSettings = {
            url: '/home',
            templateUrl: 'views/home/home.view.html',
            controller: 'videoController',
            controllerAs: 'vm'
        };

        var videoSettings = {
            url: '/videos',
            templateUrl: 'views/video/video.view.html',
            controller: 'videoController',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        };

        var savedVideoSettings = {
            url: '/saved-videos',
            templateUrl: 'views/video/saved.videos.view.html',
            controller: 'savedVideoController',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }],
                "savedVideos": ["videoService", function(videoService) {
                    return videoService.listVideos().then(function(result) {
                        return result;
                    })
                    .catch(function(error) {
                        return [];
                    });
                }]
            }
        };

        var loginSettings = {
            url: '/login',
            templateUrl: 'views/auth/login.view.html',
            controller: 'authController',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForSignIn();
                }]
            }
        };

        var signinSettings = {
            url: '/signin',
            templateUrl: 'views/auth/signup.view.html',
            controller: 'authController',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForSignIn();
                }]
            }
        };

        $stateProvider
            .state('home', homeSettings)
            .state('videos', videoSettings)
            .state('login', loginSettings)
            .state('signin', signinSettings)
            .state('saved-videos', savedVideoSettings)
        };

    angular.module('VideoApp')
        .config(['$urlRouterProvider', '$stateProvider', '$sceDelegateProvider', config]);
})();
