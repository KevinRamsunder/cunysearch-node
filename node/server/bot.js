var qs = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var FormData = require('form-data');
var formTemplate = require('./form');
var config = require('./config.js');
var Parser = require('../parse-package/main-parser.js');

var Bot = function() {};

Bot.prototype.submitSearch = function(inst, term, dept) {
    var options = {
        url: config.cuny.longUrl,
        headers: config.cuny.headers,
        jar: request.jar()
    };

    request.post(options, function(err, res, body) {
        if(err) {
            console.error(err);
            return;
        } 
        
        var parsed = cheerio.load(body);
        var key = parsed(config.html.key).val();

        var submit_options = {
            url: config.cuny.shortUrl,
            form: qs.stringify(formTemplate.getTemplate(key, inst, term, dept)),
            headers: options.headers,
            jar: options.jar
        };

        request.post(submit_options, function(err, res, body) {
            request.post(submit_options, function(err, res, body) {
                var parser = new Parser(body);
                var results = parser.getJSON();
                console.log(JSON.stringify(results, null, 2));
            });
        });
    });
};

module.exports = Bot;