var pg = require('pg-promise');
var bluebird = require('bluebird');
var config = require('../../config');

var databaseUrl = config.DATABASE_URL;
var options = {
    promiseLib: bluebird
};

var dbConnection = pg(options)(databaseUrl);

module.exports = dbConnection;
