var request = require('supertest');
var app = require('../../index');
var assert = require('assert');

describe('USERS', function() {
    it("should create users", function(done) {
        var body = {
            email: "ty@email.com"
        };

        request(app)
            .post('/user')
            .set('Content-Type', 'application/json')
            .send(body)
            .expect(200)
            .end(function(err, res) {
                done();
            })
    })
}