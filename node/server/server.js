var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// require session store
var redis = require('redis');
var client = redis.createClient();
var RedisStore = require('connect-redis')(session);

// configuration strings
var config = require('./config.js');

// initialize express app
var app = express();

// redis client error handler
client.on('error', function(err) {
    console.log('Redis Error: ' + err)
});

// initialize session management
app.use(session({
    secret: config.server.session_secret,
    saveUnitialized: true,
    resave: true,
    store: new RedisStore({host: 'localhost', port: '8000'})
}));

app.use(function printSession(req, res, next) {
    console.log('Express Session: ' + req.session);
    return next();
});

// connect public directory to node app
app.use(express.static('../../public'));

// listen for http requests on port
app.listen(8000);
console.log("Running on 8000");

var main_routes = require('../routes/main_routes');
app.use('/', main_routes);
