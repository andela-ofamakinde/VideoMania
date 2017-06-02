(function () {
    'use strict';
    angular
        .module('VideoApp')
        .service('videoService', videoService);

    videoService.$inject = [];

    function videoService() {
        return {}
    }
})();
