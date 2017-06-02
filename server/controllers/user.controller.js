var db = require('../utils/connect');

var createUser = function(req, res) {
    var data = req.body;
    var sql = `INSERT INTO users(email)VALUES($1) RETURNING id, email`;

    if (data.email) {
        db.one(sql, [data.email])
        .then(function(result) {
            res.status(201).json({message: "Registration Successful", access_token: accessToken});
        })
        .catch(function(error) {
            res.status(500).json({message: "Unknown Error"});
        })
    } else {
        res.status(400).json({message: "email is required"});
    }
};

module.exports = createUser;
