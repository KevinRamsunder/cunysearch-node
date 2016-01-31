var qs = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var FormData = require('form-data');
var formTemplate = require('./form');
var config = require('./config.js');
var Parser = require('../parse-package/main-parser.js');
var EnrollmentInfoParser = require('../parse-package/parsers/enrollment-info-parser.js');

var Bot = function() {
    // if not init_bot param is provided
    if(arguments.length === 0) {
        this.key = undefined;

        this.submit_options = {
            url: config.cuny.shortUrl,
            form: undefined,
            headers: undefined,
            jar: undefined
        }
    } else {
        // if an init_bot param IS provided
        this.key = arguments[0].key;
        this.submit_options = arguments[0].submit_options;
    }
};

Bot.prototype.submitSearch = function(inst, term, dept, callback) {
    var self = this;

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
        self.key = parsed(config.html.key).val();

        self.submit_options.headers = options.headers;
        self.submit_options.jar = options.jar;
        self.submit_options.form = qs.stringify(formTemplate.getTemplate(self.key, inst, term, dept));

        request.post(self.submit_options, function(err, res, body) {
            request.post(self.submit_options, function(err, res, body) {
                var parser = new Parser(body);
                var results = parser.getJSON();
                results = JSON.stringify(results, null, 2);
                callback(results, self);
            });
        });
    });
};

Bot.prototype.submitSeatSearch = function(inst, term, dept, nbr, callback) {
    var self = this;

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
        self.key = parsed(config.html.key).val();

        self.submit_options.headers = options.headers;
        self.submit_options.jar = options.jar;
        self.submit_options.form = qs.stringify(formTemplate.fullSeatTemplate(self.key, inst, term, dept, nbr));

        request.post(self.submit_options, function(err, res, body) {
            request.post(self.submit_options, function(err, res, body) {
                var parser = new Parser(body);
                var results = parser.getJSON();
                results = JSON.stringify(results, null, 2);
                callback(results, self);
            });
        });
    });
};

Bot.prototype.submitClass = function(section, callback) {
    var self = this;

    self.submit_options.form = qs.stringify(formTemplate.enrollmentTemplate(self.key, section));

    request.post(self.submit_options, function(err, res, body) {
        var parser = new EnrollmentInfoParser(body);
                            
        var results = {
            classCapacity: parser.classCapacity,
            classTotal: parser.classTotal,
            classAvailable: parser.classAvailable
        };

        results = JSON.stringify(results, null, 2);
        callback(results, self);
    });
};

    
module.exports = Bot;