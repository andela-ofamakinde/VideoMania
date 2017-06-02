describe('Controller Tests', function() {
    beforeEach(module('VideoApp'));

    describe('Video Controller', function() {
        var videoController, videoService;

        beforeEach(inject(function(_videoService_) {
            videoService = _videoService_;
        }));

        beforeEach(inject(function($controller) {
            videoController = $controller('videoController', {
            videoService: videoService
            });
        }))

        it('controller should be defined', function() {
            var response = {
                videoId: "12345",
                videoName: "Dancing video"
            };

        var responsePromise = videoService.getVideos();
        var result;

        responsePromise.then(function(response) {
            result = response.data;
        })

        expect(result).toEqual(returnData)

        expect(videoController).toBeDefined();
        })
    })
})
