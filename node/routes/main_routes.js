var queue = require('../server/async');
var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var Bot = require('../server/bot');

// create routes for handling http requests
var main_routes = express.Router();

// include middleware for parsing json
main_routes.use(bodyParser.json());

// get search results from cuny and return to front-end
main_routes.post('/search-request', function(req, res) {
    req.session.bot = new Bot();

    handleSession(req);

    var data = {
        inst: req.body.data.inst.htmlKey,
        term: req.body.data.term.htmlKey,
        dept: req.body.data.dept.htmlKey
    };

    req.session.inst = data.inst;
    req.session.term = data.term;
    req.session.dept = data.dept;

    search(data, req, res);
});

function search(values, req, res) {
    var params = {
        bot: req.session.bot,
        inst: values.inst,
        term: values.term,
        dept: values.dept
    };

    queue.push(params, function(val, newBot) {
        console.log(('Cuny search complete. result length: ' + val.length).green);
        req.session.bot = newBot;
        res.json(val);
    });
}

main_routes.post('/enrollment-request', function(req, res) {
    // create new bot
    req.session.searchBot = new Bot();

    // re-create exact search request
    var params = {
        bot: req.session.searchBot,
        inst: req.session.inst,
        term: req.session.term,
        dept: req.session.dept,
        section: req.body.data.seatKey,
        nbr: req.body.data.classID
    };

    // submit search and return results
    queue.push(params, function(val, newBot) {
        console.log((val).red);

        req.session.searchBot = newBot;
        res.json(val);
    });
});

function handleSession(req) {
    console.log("Received request at /search-request");
    
    if(req.session.init === undefined) {
        req.session.init = req.session.id;
        console.log(('Session created @ ' + req.session.id).yellow);
    } else {
        console.log(('Return to session @ ' + req.session.id).yellow);
    }
}

module.exports = main_routes;