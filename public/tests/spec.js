describe('Controller Tests', function() {
    beforeEach(module('VideoApp'));

    describe('Video Controller', function() {
        var videoController, videoService, httpBackend;

        beforeEach(inject(function(_videoService_) {
            videoService = _videoService_;
        }));

        beforeEach(inject(function($controller) {
            videoController = $controller('videoController', {
                videoService: videoService
            });
        }))
    })
})
