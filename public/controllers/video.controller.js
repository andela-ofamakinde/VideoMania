(function(){
    angular.module('VideoApp')
    .controller('videoController', videoController);

    videoController.$inject = ['videoService'];

    function videoController(videoService) {}
})()
