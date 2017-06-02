var userController = require('../controllers/user.controller');
var express = require('express');
var router = express.Router();

router.post('/user', userController);

module.exports = router;
