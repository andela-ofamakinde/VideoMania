var test = require('./test.js');
var dev = require('./dev.js');
var prod = require('./prod.js');

var env;
var nodeEnv = process.env.NODE_ENV || 'develop';

if (nodeEnv === 'develop') env = dev;
else if (nodeEnv === 'production') env = prod;
else env = test;

module.exports = env;
