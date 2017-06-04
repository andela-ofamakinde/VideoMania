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
                maxResults: 9,
                key: "API_KEY"
            });
        };

        var cacheVideos = function(data) {
            $window.localStorage.removeItem('videos');
            $window.localStorage.setItem('videos', JSON.stringify(data));
            return;
        }

        var getVideoCache = function() {
            var array = $window.localStorage.getItem('videos');
            var returnedItems;
            if (array.length) {
                 returnedItems = JSON.parse(array);
            } else {
                returnedItems = [];
            }
            return returnedItems;
        }

        var saveVideoId = function(videoId, title) {
            var uid = authService.getCurrentUser();
            var ref = firebase.database().ref('/videos/' + uid);
            return ref.push({"videoId": videoId, "title": title});
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
            cacheVideos: cacheVideos,
            getVideoCache: getVideoCache,
            saveVideoId: saveVideoId,
            listVideos: listVideos
        };
    }
})();
