(function(){
    'use strict';
    angular.module('VideoApp')
        .controller('videoController', videoController);

    videoController.$inject = ['videoService', 'toastr', '$window'];

    function videoController(videoService, toastr, $window) {
        var vm = this;
        vm.searchQuery = "";
        vm.videoItems;
        vm.watchVideo = false;

        vm.searchVideos = function() {
            if (vm.searchQuery) {
                videoService.getVideos(vm.searchQuery)
                .then(function(result) {
                    if (result.data.items) {
                        vm.constructVideoUrl(result.data.items);
                        vm.videoItems = result.data.items;
                    } else {
                        toastr.info("No Videos Match Search");
                    }
                })
                .catch(function(error) {
                    toastr.error("Unknown Error", "Error");
                });
            } else {
                toastr.error("Unknown Error", "Error");
            }
        };

        vm.showVideo = function(videoId) {
            vm.watchVideo = true;
        };

        vm.constructVideoUrl = function(videos) {
            return videos.forEach(function(video) {
                video.videoUrl = 'https://www.youtube.com/embed/' + video.id.videoId;
            });
        }
    }
})()
