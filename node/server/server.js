var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var colors = require('colors');
var mongo = require('./mongo');

// configuration strings
var config = require('./config.js');

// initialize express app
var app = express();

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