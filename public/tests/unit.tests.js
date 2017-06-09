describe('Video Service Tests', function() {
    var passPromise, mockVideoService, rootScope, videoServiceObject, mockYoutubeFactory;

    beforeEach(function() {
        var videos = {
            id: "123",
            title: "dancing"
        };
        mockYoutubeFactory = {
            getVideosFromSearchByParams: function() {
                return videos;
            }
        };

        module('VideoApp');
        module(function($provide) {
            $provide.value('youtubeFactory', mockYoutubeFactory);
            $provide.service('videoSvc', function($q) {
                var getVideos = jasmine.createSpy('getVideos').and.callFake(function() {
                    return passPromise ? $q.when(videos) : $q.reject('Unknown Error');
                });
                return {
                  getVideos: getVideos
                };
            });
        });

        inject(function($rootScope, $window, videoSvc, videoService) {
            rootScope = $rootScope;
            mockVideoService = videoSvc;
            videoServiceObject = videoService;
            window = $window;
        });

    });

    beforeEach(function() {
        var store = {};

        spyOn(window.localStorage, 'getItem').and.callFake(function(key) {
            return store[key] || null;
        });
        spyOn(window.localStorage, 'removeItem').and.callFake(function(key) {
            delete store[key];
        });
        spyOn(window.localStorage, 'setItem').and.callFake(function(string) {
            return store[key] = string
        });
        spyOn(window.localStorage, 'clear').and.callFake(() =>  {
            store = {};
        });
    });

    afterEach(function () {
        store = {};
    });

    it('should get videos', function() {
        videoServiceObject.getVideos()
        rootScope.$digest();

        expect(mockVideoService.getVideos).toHaveBeenCalled();
    });

    it('should save videos in cache videos', function() {
        expect(window.localStorage.getItem('videos')).toBeNull();

        videoServiceObject.cacheVideos(videos);

        expect(window.localStorage.getItem('videos')).not.toBeNull();
    });
})
