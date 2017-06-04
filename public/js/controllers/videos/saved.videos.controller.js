(function(){
    'use strict';
    angular.module('VideoApp')
        .controller('savedVideoController', savedVideoController);

    savedVideoController.$inject = ['videoService', 'toastrService', 'savedVideos'];

    function savedVideoController(videoService, toastrService, savedVideos) {
        var vm = this;
        vm.savedVideos = savedVideos;
    }
})();
