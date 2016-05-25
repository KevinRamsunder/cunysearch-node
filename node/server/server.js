var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var mongo = require('./mongo');

// new session handling
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var app = express();

app.use(session({
    name: 'server-session-cookie-id',
    secret: Math.random().toString(36).substring(7),
    store: new FileStore(),
    saveUninitialized: true,
    resave: true
}));

// configuration strings
var config = require('./config.js');

// routes
var main_routes = require('../routes/main_routes');
app.use('/api', main_routes);

var info_routes = require('../routes/info_routes');
app.use('/info', info_routes);

// load information from CUNYFirst server
mongo.populateDatabase(function(err) {
    if(err) {
        console.log('Cron Job unable to run.');
    } else {
        console.log('Cron Job ran successfully.');
    }
});

// connect public directory to node app
app.use(express.static('../../public'));

// listen for http requests on port
app.listen(8000);
console.log("Running on 8000".white);