var cheerio = require('cheerio');

function parseResultBody(body) {
    $ = cheerio.load(body);

    var headings = resultsToArray($, '[id^=win0divGPSSR_CLSRSLT_WRK_GROUPBOX2]');
    console.log(headings);

    var classesPerHeadings = resultsToArray($, 'table[id^=\'ACE_$ICField104\']');
    var nbr = resultsToArray($, '[id^=MTG_CLASS_NBR]');
    var section = resultsToArray($, '[id^=MTG_CLASSNAME]');
    var status = resultsToArray($, '[class^=SSSIMAGECENTER]');
    var room = resultsToArray($, '[id^=MTG_ROOM]');
    var time = resultsToArray($, '[id^=MTG_DAYTIME]');
    var instructors = resultsToArray($, '[id^=MTG_INSTR]');
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