(function () {
    'use strict';
    angular
        .module('VideoApp')
        .service('videoService', videoService);

    videoService.$inject = ['youtubeFactory', '$window', '$firebaseArray', 'authService'];

    function videoService(youtubeFactory, $window, $firebaseArray, authService) {
        var getVideos = function(queryString) {
            return youtubeFactory.getVideosFromSearchByParams({
                q: queryString,
                videoEmbeddable: true,
                key: 'AIzaSyA9Jnxg5-3GniP3ESPUot3tFjKc-T035Y0'
            });
        };

        var cacheVideo = function(data) {
            $window.localStorage['videos'] = data;
        }

        var getVideoCache = function() {
            return $window.localStorage['videos'];
        }

        var saveVideoId = function(videoId) {
            var uid = authService.getCurrentUser();
            var ref = firebase.database().ref('/videos/' + uid);

            return ref.push({"videoId": videoId});
        }

        var listVideos = function() {
            var uid = authService.getCurrentUser();
            var videosRef = firebase.database().ref('/videos/' + uid);

            return videosRef.once('value').then(function(snapshot) {
                var videos = [];
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    videos.push(childData);
                });
                return videos;
            });
        }

        return {
            getVideos: getVideos,
            cacheVideo: cacheVideo,
            getVideoCache: getVideoCache,
            saveVideoId: saveVideoId,
            listVideos: listVideos
        };
    }
})();
