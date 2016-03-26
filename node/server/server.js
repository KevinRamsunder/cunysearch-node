var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var colors = require('colors');

// require session store
var redis = require('redis');
var client = redis.createClient();
var RedisStore = require('connect-redis')(session);

// configuration strings
var config = require('./config.js');

// initialize express app
var app = express();
var store = undefined;

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
    store = new RedisStore({host: rtg.hostname, port: rtg.port});
} else {
    var redis = require("redis").createClient();
    store = new RedisStore({host: 'localhost', port: '6379'});
}

// initialize session management
app.use(session({
    secret: config.server.session_secret,
    saveUninitialized: true,
    resave: true,
    store: store
}));

// redis client error handler
client.on('error', function(err) {
    console.log('Redis Error: ' + err);
});

// connect public directory to node app
app.use(express.static('../../public'));

// listen for http requests on port
app.listen(8000);
console.log("Running on 8000".white);

var main_routes = require('../routes/main_routes');
app.use('/api', main_routes);

var info_routes = require('../routes/info_routes');
app.use('/info', info_routes);