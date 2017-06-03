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
            templateUrl: 'views/home.view.html',
            controller: 'videoController',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$waitForSignIn();
                }]
            }
        };

        var videoSettings = {
            url: '/videos',
            templateUrl: 'views/video.view.html',
            controller: 'videoController',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        };

        var loginSettings = {
            url: '/login',
            templateUrl: 'views/login.view.html',
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
            templateUrl: 'views/signup.view.html',
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
        };

    angular.module('VideoApp')
        .config(['$urlRouterProvider', '$stateProvider', '$sceDelegateProvider', config]);
})();
