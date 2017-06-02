(function () {
    'use strict';
    angular
        .module('VideoApp')
        .service('videoService', videoService);

    videoService.$inject = ['youtubeFactory', '$window'];

    function videoService(youtubeFactory, $window) {
        var getVideos = function(queryString) {
            return youtubeFactory.getVideosFromSearchByParams({
                q: queryString,
                videoEmbeddable: true,
                key: YOUTUBE_API_KEY
            });
        };

        var cacheVideo = function(data) {
            $window.localStorage['videos'] = data;
        }

        var getVideoCache = function() {
            return $window.localStorage['videos'];
        }

        return {
            getVideos: getVideos,
            cacheVideo: cacheVideo,
            getVideoCache: getVideoCache
        };
    }
})();
