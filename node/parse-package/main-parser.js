var cheerio = require('cheerio');
var Structure = require('./structure.js');

var ClassHeadingParser = require('./parsers/class-heading-parser.js');
var ClassSectionParser = require('./parsers/class-section-parser.js');
var MultiSectionParser = require('./parsers/multi-section-parser.js');
var SingleSectionParser = require('./parsers/single-section-parser.js');
var ResultPageParser = require('./parsers/result-page-parser.js');

var ClassHeading = require('./containers/class-heading.js');
var EnrollmentInfo = require('./containers/enrollment-info.js');
var MultiRowSection = require('./containers/multi-row-section.js');
var SingleRowSection = require('./containers/single-row-section.js');
var RowValidator = require('./containers/row-validator.js');

var Parser = function(html) {
    var rpp = new ResultPageParser(html);
    this.classStructure = new Structure();

    for (var i = 0; i < rpp.headingSize(); i++) {
        var heading = this.getHeadingInfo(rpp, i);
        this.classStructure.createSectionHeader(heading);
        this.addClassesPerHeading(rpp, i);
    }
};

Parser.prototype.getParserNoRow = function(parser) {
    return new SingleSectionParser(parser.getTime(), parser.getRoom(), parser.getInstr());
};

Parser.prototype.getParser = function(row, parser) {
    return new MultiSectionParser(row.rows, parser.getTime(), parser.getRoom(), parser.getInstr());
};

Parser.prototype.getSection = function(ov, inv) {
    if (inv.timeArray !== undefined) {
        return new MultiRowSection(ov, inv);
    } else {
        return new SingleRowSection(ov, inv);
    }
};

Parser.prototype.getHeadingInfo = function(parser, i) {
    var chp = new ClassHeadingParser(parser.headings[i], parser.classesPerHeadings[i]);
    return new ClassHeading(chp);
};

Parser.prototype.getValidator = function(parser) {
    return new RowValidator(parser.getTime());
};

Parser.prototype.getOverhead = function(parser) {
    return new ClassSectionParser(parser.getNbr(), parser.getSection(), parser.getStatus());
};

Parser.prototype.addClassesPerHeading = function(parser, headingNumber) {
    var size = parseInt(this.classStructure.getClassHeader(headingNumber).quantity);

    for (var i = 0; i < size; i++) {
        var validator = this.getValidator(parser);
        var classSection = this.getClassSection(validator, parser);
        this.classStructure.addClassToHeader(headingNumber, classSection);
        parser.incrementCounter();
    }
};

Parser.prototype.getClassSection = function(rows, pars) {
    var overhead = this.getOverhead(pars);

    if (rows.rows === 1) {
        var handler = this.getParserNoRow(pars);
        return this.getSection(overhead, handler);
    } else {
        var handler = this.getParser(rows, pars);
        return this.getSection(overhead, handler);
    }
};

Parser.prototype.printClassStructure = function() {
    for (var i = 0; i < parseInt(this.classStructure.classHeadings.length); i++) {
        console.log(this.classStructure.getClassHeader(i).title);

        for (var j = 0; j < parseInt(this.classStructure.getClassHeader(i).quantity); j++) {
            var section = this.classStructure.getClassSection(i, j);
            console.log(section.nbr + '\n' + 
                        section.time + '\n' + 
                        section.room + '\n' + 
                        section.instr + '\n' + 
                        section.status + '\n' +
                        section.htmlKey + '\n');
        }
    }
};

Parser.prototype.getJSON = function() {
    var jsonObject = {'results': []};

    for (var i = 0; i < parseInt(this.classStructure.classHeadings.length); i++) {
        var subJsonArray = {};
        subJsonArray['title'] = this.classStructure.getClassHeader(i).title;
        subJsonArray['quantity'] = parseInt(this.classStructure.getClassHeader(i).quantity);
        subJsonArray['sections'] = [];

        for (var j = 0; j < subJsonArray['quantity']; j++) {
            var sectionJson = {};

            var section = this.classStructure.getClassSection(i, j);
            sectionJson['nbr'] = section.nbr;
            sectionJson['time'] = section.time;
            sectionJson['room'] = section.room;
            sectionJson['instr'] = section.instr;
            sectionJson['status'] = section.status;
            sectionJson['htmlKey'] = section.htmlKey;

            subJsonArray['sections'].push(sectionJson);
        }

        jsonObject['results'].push(subJsonArray);
    }

    return jsonObject;
};

module.exports = Parser;
