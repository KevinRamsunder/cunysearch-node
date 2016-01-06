var cheerio = require('cheerio');

function parseResultBody(body) {
    $ = cheerio.load(body);

    var headings = resultsToArray($, 'div[id^=win0divGPSSR_CLSRSLT_WRK_GROUPBOX2]');
    var classesPerHeadings = resultsToArray($, 'table[id^=\'ACE_$ICField104\']');
    var nbr = resultsToArray($, 'a[id^=MTG_CLASS_NBR]');
    var section = resultsToArray($, 'a[id^=MTG_CLASSNAME]');
    var status = resultsToArray($, 'img[class^=SSSIMAGECENTER]');
    var room = resultsToArray($, 'span[id^=MTG_ROOM]');
    var time = resultsToArray($, 'span[id^=MTG_DAYTIME]');
    var instructors = resultsToArray($, 'span[id^=MTG_INSTR]');

    for (i = 0; i < headings.length; i++) {
        var heading = getHeadingInfo(i);
        // create class structure

    }
}

function getHeadingInfo(body) {

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