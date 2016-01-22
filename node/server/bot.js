var qs = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var FormData = require('form-data');
var formTemplate = require('./form');
var config = require('./config.js');
var Parser = require('../parse-package/main-parser.js');

var Bot = function() {
    this.options = {
        url: config.cuny.longUrl,
        headers: config.cuny.headers,
        jar: request.jar()
    };
};

Bot.prototype.submitSearch = function(inst, term, dept, callback) {
    request.post(this.options, function(err, res, body) {
        if(err) {
            console.error(err);
            return;
        } 
        
        var parsed = cheerio.load(body);
        this.key = parsed(config.html.key).val();

        var submit_options = {
            url: config.cuny.shortUrl,
            form: qs.stringify(formTemplate.getTemplate(this.key, inst, term, dept)),
            headers: this.options.headers,
            jar: this.options.jar
        };

        request.post(submit_options, function(err, res, body) {
            request.post(submit_options, function(err, res, body) {
                var parser = new Parser(body);
                var results = parser.getJSON();
                results = JSON.stringify(results, null, 2);
                callback(results);
            });
        });
    });
};

module.exports = Bot;