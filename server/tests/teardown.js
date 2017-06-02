var cmd = require('node-cmd');

describe("Run Test DownMigration", function() {
    it('should run test down migration', function(done){
        cmd.get('db-migrate down -e test -c 100', function(err, result) {
            console.log(err, result, "migration down result");
            done();
        })
    })
})
