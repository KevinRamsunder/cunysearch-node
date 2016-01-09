var cheerio = require('cheerio');

var ResultPageParser = function() {
    this.$ = cheerio.load(body);

    this.parseCounter = 0;
    this.headings = resultsToArray($, 'div[id^=win0divGPSSR_CLSRSLT_WRK_GROUPBOX2]');
    this.classesPerHeadings = resultsToArray($, 'table[id^=\'ACE_$ICField104\']');
    this.nbr = resultsToArray($, 'a[id^=MTG_CLASS_NBR]');
    this.section = resultsToArray($, 'a[id^=MTG_CLASSNAME]');
    this.status = resultsToArray($, 'img[class^=SSSIMAGECENTER]');
    this.room = resultsToArray($, 'span[id^=MTG_ROOM]');
    this.time = resultsToArray($, 'span[id^=MTG_DAYTIME]');
    this.instructors = resultsToArray($, 'span[id^=MTG_INSTR]');
};

ResultPageParser.prototype.incrementCounter = function() {
    this.parseCounter += 1;
};

ResultPageParser.prototype.headingSize = function() {
    return this.headings.length;
};

ResultPageParser.prototype.getHeadings = function() {
    return self.headings[self.parseCounter];
};

ResultPageParser.prototype.getClassesPerHeading = function() {
    return self.getClassesPerHeading[this.parseCounter];
};

ResultPageParser.prototype.getNbr = function() {
    return this.nbr[this.parseCounter];
};

ResultPageParser.prototype.getSection = function() {
    return this.section[this.parseCounter];
};

ResultPageParser.prototype.getStatus = function() {
    return this.status[this.parseCounter];
};

ResultPageParser.prototype.getRoom = function() {
    return this.room[this.parseCounter];
};

ResultPageParser.prototype.getTime = function() {
    return this.time[this.parseCounter];
};

ResultPageParser.prototype.getInstr = function() {
    return this.instr[this.parseCounter];
};

function parseResultBody() {

}

function resultsToArray(body, parseString) {
    var results = body(parseString);
    var resultsArray = [];

    results.each(function(i) {
        resultsArray[i] = $(this).text().trim();
    });

    return resultsArray;
}

module.exports = {
    parseResultBody: parseResultBody
}