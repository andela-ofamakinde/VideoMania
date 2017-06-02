angular.module('VideoApp', ['ui.router']);

function config($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');

    var homeSettings = {
        url: '/home',
        templateUrl: 'views/home.view.html',
        controller: 'videoController',
        controllerAs: 'vm'
    };

    $stateProvider
        .state('home', homeSettings)
};

angular.module('VideoApp')
    .config(['$urlRouterProvider', '$stateProvider', config]);
