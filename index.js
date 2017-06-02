require('dotenv').config();

var pg = require('pg');
var express = require('express');
var config = require('./config');
var expressConfig = require('./server/utils/express');

var app = express();
var port = config.PORT;

expressConfig(app);

app.listen(port, function() {
    console.log("App started on port", port);
});

module.exports = app;