var express = require('express');
var router = express.Router();
var config = require('../../config');
var auth = require('./auth');

router.get('/config', auth, function(req, res) {
    res.status(200).json({data: config});
});

module.exports = router;
