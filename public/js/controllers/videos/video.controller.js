(function(){
    'use strict';
    angular.module('VideoApp')
        .controller('videoController', videoController);

    videoController.$inject = ['videoService', 'toastrService', '$window'];

    function videoController(videoService, toastrService, $window) {
        var vm = this;
        vm.searchQuery = "";
        vm.videoItems = videoService.getVideoCache();

        vm.searchVideos = function() {
            if (vm.searchQuery) {
                videoService.getVideos(vm.searchQuery)
                .then(function(result) {
                    checkVideoResponse(result);
                })
                .catch(function(error) {
                    toastrService.unknownError();
                });
            } else {
                toastrService.searchWarning();
            }
        };

        vm.watchLater = function(videoId, title) {
            videoService.saveVideoId(videoId, title).then(function(result) {
                vm.saved = true;
            }).catch(function(error) {
                toastrService.unknownError();
            });
        }

        var checkVideoResponse = function(result) {
            if (result.data.items) {
                vm.videoItems = result.data.items;
                cacheSearchResult(vm.videoItems);
            } else {
                toastrService.emptySearch();
            }
            return;
        }

        var cacheSearchResult = function(data) {
            videoService.cacheVideos(data);
            return;
        }
    }
})();
