var qs = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var FormData = require('form-data');
var formTemplate = require('./form');
var config = require('./config.js');
var Parser = require('../parse-package/main-parser.js');

var InfoBot = function(callback) {
    var self = this;

    this.options = {
        url: config.cuny.longUrl,
        headers: config.cuny.headers,
        jar: request.jar()
    };

    request.post(this.options, function(err, res, body) {
        if(err) {
            console.error(err);
            return;
        } 
        
        var parsed = cheerio.load(body);
        self.key = parsed(config.html.key).val();
        callback();
    });
};

InfoBot.prototype.getInstitutions = function(callback) {
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
        var results = parsed(config.html.inst).children();
        var parsedResults = [];

        parsed(results).each(function(i, elem) {
            var school = parsed(this).text().trim();
            var key = parsed(this).val().trim();

            if(school !== '' && school !== undefined) {
                parsedResults.push({school: school, htmlKey: key});
            }
        });

        callback(parsedResults);
    });
};

InfoBot.prototype.parseXML = function(inst, callback) {
    var submit_options = {
        url: config.cuny.shortUrl,
        form: qs.stringify(formTemplate.termTemplate(this.key, inst.htmlKey)),
        headers: this.options.headers,
        jar: this.options.jar
    };

    request.post(submit_options, function(err, res, body) {
        request.post(submit_options, function(err, res, body) {
            if(err) {
                console.error(err);
            }

            // hack to fix cheerio shortcoming
            body = body.replace(/<!\[CDATA\[/ig, "$1");
            var parsed = cheerio.load(body);

            callback(inst, parsed);
        });
    });
};

InfoBot.prototype.getTerms = function(parsed) {
    // make results html into valid html
    var termResults = parsed(config.html.term).html();
    termResults = '<select id=\'term\'>' + termResults + '</select>';
    
    // parse extracted snippet of html
    parsed = cheerio.load(termResults);
    termResults = parsed('select[id=\'term\']').children();
    var parsedResults = [];

    parsed(termResults).each(function(i, elem) {
        var term = parsed(this).text().trim();
        var key = parsed(this).val().trim();

        if(term !== '' && term !== undefined) {
           parsedResults.push({term: term, htmlKey: key});
        }
    });

    return parsedResults;
};

InfoBot.prototype.getDepts = function(parsed) {
    // make results html into valid html
    var deptResults = parsed(config.html.depts).html();
    deptResults = '<select id=\'depts\'>' + deptResults + '</select>';
    
    // parse extracted snippet of html
    parsed = cheerio.load(deptResults);
    deptResults = parsed('select[id=\'depts\']').children();
    var parsedResults = [];

    parsed(deptResults).each(function(i, elem) {
        var dept = parsed(this).text().trim();
        var key = parsed(this).val().trim();

        if(dept !== '' && dept !== undefined) {
           parsedResults.push({dept: dept, htmlKey: key});
        }
    });

    return parsedResults;
};

var bot = new InfoBot(function() {
    // load institutions from cuny
    bot.getInstitutions(function(institutions) {
        for(var i = 0; i < institutions.length; i++) {
            // load modified page based on selected institution
            bot.parseXML(institutions[i], function(inst, parserObject) {
                // extract terms and depts of each institution
                console.log(inst.school);
                console.log(bot.getDepts(parserObject));
            });
        }
    });
});