var queue = require('../server/async');
var express = require('express');
var bodyParser = require('body-parser');

// create routes for handling http requests
var main_routes = express.Router();

// include middleware for parsing json
main_routes.use(bodyParser.json());

main_routes.get('/search-request', function(req, res) {
    console.log("received request at /search-request");
    search({inst: 'QNS01', term: '1162', dept: 'CSCI'}, res);
});

function search(values, res) {
    queue.push({inst: values.inst, term: values.term, dept: values.dept}, function(val) {
        console.log('i got something, length: ' + val.length)
        res.json(val);
    });
}

module.exports = main_routes;