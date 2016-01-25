var queue = require('../server/async');
var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');

// create routes for handling http requests
var main_routes = express.Router();

// include middleware for parsing json
main_routes.use(bodyParser.json());

// get search results from cuny and return to front-end
main_routes.post('/search-request', function(req, res) {
    if(req.session.init === undefined) {
        req.session.init = req.session.id;
        console.log(('Session created @ ' + req.session.id).yellow);
    } else {
        console.log(('Return to session @ ' + req.session.id).yellow);
    }

    console.log("Received request at /search-request");

    var data = {
        inst: req.body.data.inst.htmlKey,
        term: req.body.data.term.htmlKey,
        dept: req.body.data.dept.htmlKey
    };

    search(data, res);
});

function search(values, res) {
    queue.push({inst: values.inst, term: values.term, dept: values.dept}, function(val) {
        console.log(('Cuny search complete. result length: ' + val.length).green);
        res.json(val);
    });
}

module.exports = main_routes;