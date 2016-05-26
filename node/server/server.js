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
console.log("Populating Database... please wait.");

mongo.populateDatabase(function(err) {
    if(err) {
        console.log('Database unable to populate, CUNYFirst may be down. Program will terminate.');
    } else {
        console.log('Database populated successfully.\n');
        
        // listen for http requests on port AFTER database is finished loading
        app.listen(8000);
        console.log("Running on 8000".white);
    }
});

// connect public directory to node app
app.use(express.static('../../public'));
