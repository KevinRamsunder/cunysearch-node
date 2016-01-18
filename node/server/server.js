var express = require('express');
var bodyParser = require('body-parser');

// initialize express app
var app = express();

// connect public directory to node app
app.use(express.static('../../public'));

// listen for http requests on port
app.listen(8000);
console.log("Running on 8000");

var main_routes = require('../routes/main_routes');
app.use('/', main_routes);
