var cheerio = require('cheerio');
var Structure = require('./structure.js');
var ResultPageParser = require('./result-page-parser.js');

var EnrollmentParser = function(html) {
    var parser = new EnrollmentInfoParser(html);
    this.enrollment = EnrollmentInfo(parser);
};

EnrollmentParser.prototype.getEnrollment = function() {
    var object = {
        'classCapacity': this.enrollment.classCapacity,
        'enrollmentTotal': this.enrollment.enrollmentTotal,
        'availableSeats': this.enrollment.availableSeats
    };

    return object;
};

var Parser = function(html) {
    var rpp = new models.ResultPageParser(html);
    this.classStructure = new Structure();
};