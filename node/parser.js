var cheerio = require('cheerio');
var structure = require('./structure.js');
var models = require('./models.js');

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
    this.classStructure = new structure.Structure();
};
