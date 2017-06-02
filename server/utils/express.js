var bodyParser = require('body-parser');
var helmet = require('helmet');
var express = require('express');
var morgan = require('morgan');
var userRoutes = require('../routes/user.routes');

var expressConfig = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(helmet());
    app.disable('x-powered-by');

    app.use(morgan('dev'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use('/', userRoutes);
    app.use('/', express.static(process.cwd() + '/public'));
}

module.exports = expressConfig;
