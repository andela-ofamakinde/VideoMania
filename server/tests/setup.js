var cmd = require('node-cmd');

describe("Run Test Up Migration", function() {
    it('should run test up migration', function(done){
        cmd.get('db-migrate up -c 100 -e test', function(err, result) {
            console.log(err, result, "migration up result");
            done();
        })
    })
})
