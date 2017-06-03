(function(){
    'use strict';
    angular.module('VideoApp')
        .controller('videoController', videoController);

    videoController.$inject = ['videoService', 'toastr', '$window'];

    function videoController(videoService, toastrService, $window) {
        var vm = this;
        vm.videoItems;
        vm.searchQuery = "";
        vm.watchVideo = false;

        vm.searchVideos = function() {
            if (vm.searchQuery) {
                videoService.getVideos(vm.searchQuery)
                .then(function(result) {
                    vm.checkVideoResponse(result);
                })
                .catch(function(error) {
                    toastrService.unknownError();
                });
            } else {
                toastrService.searchWarning();
            }
        };

        vm.showVideo = function() {
            vm.watchVideo = true;
        };

        vm.watchLater = function(video) {
            videoService.saveVideoId(video.videoId).then(function(result) {
                vm.saved = true;
            }).catch(function(error) {
                toastrService.unknownError();
            });
        }

        vm.listSavedVideos = function() {
            videoService.listVideos().then(function(result){
                //console.log(result);
            })
            .catch(function(error) {
                //console.log(error);
            })
        }

        var constructVideoUrl = function(videos) {
            return videos.forEach(function(video) {
                video.videoUrl = 'https://www.youtube.com/embed/' + video.id.videoId;
            });
        }

        var checkVideoResponse = function(result) {
            if (result.data.items) {
                constructVideoUrl(result.data.items);
                vm.videoItems = result.data.items;
            } else {
                toastrService.eemptySearch();
            }
        }
    }
})()
