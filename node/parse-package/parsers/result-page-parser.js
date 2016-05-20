var cheerio = require('cheerio');

var ResultPageParser = function(body) {
    this.$ = cheerio.load(body);

    this.parseCounter = 0;
    this.headings = resultsToArray(this.$, 'div[id^=win0divSSR_CLSRSLT_WRK_GROUPBOX2GP]', 'text');
    this.classesPerHeadings = resultsToArray(this.$, 'table[id^=\'ACE_$ICField48\']', 'size');
    this.nbr = resultsToArray(this.$, 'a[id^=MTG_CLASS_NBR]', 'text');
    this.section = resultsToArray(this.$, 'a[id^=MTG_CLASSNAME]', 'html');
    this.status = resultsToArray(this.$, 'img[class=SSSIMAGECENTER]', 'alt');
    this.room = resultsToArray(this.$, 'span[id^=MTG_ROOM]', 'text');
    this.time = resultsToArray(this.$, 'span[id^=MTG_DAYTIME]', 'text');
    this.instructors = resultsToArray(this.$, 'span[id^=MTG_INSTR]', 'text');
};

ResultPageParser.prototype.incrementCounter = function() {
    this.parseCounter += 1;
};

ResultPageParser.prototype.headingSize = function() {
    return this.headings.length;
};

ResultPageParser.prototype.getHeadings = function() {
    return this.headings[this.parseCounter];
};

ResultPageParser.prototype.getClassesPerHeading = function() {
    return this.getClassesPerHeading[this.parseCounter];
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
    return this.instructors[this.parseCounter];
};

function resultsToArray(body, parseString) {
    var results = body(parseString);
    var resultsArray = [];

    results.each(function(i, elem) {
        resultsArray[i] = body(this);
    });

    return resultsArray;
}

function resultsToArray(body, parseString, attr) {
    var results = body(parseString);
    var resultsArray = [];

    results.each(function(i, elem) {
        if(attr === 'alt') {
            resultsArray[i] = body(this).attr('alt');
        } else if (attr === 'text') {
            resultsArray[i] = body(this).text().trim();
        } else if (attr === 'html') {
            resultsArray[i] = body(this);
        } else if (attr === 'size') {
            resultsArray[i] = body(this).children().length;
        }
        else {
            resultsArray[i] = body(this);
        }
    });

    return resultsArray;
}

module.exports = ResultPageParser;