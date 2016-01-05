var cheerio = require('cheerio');

function parseResultBody(body) {
    $ = cheerio.load(body);

    var headers = resultsToArray($, '[id^=win0divGPSSR_CLSRSLT_WRK_GROUPBOX2]');
    console.log(headers);
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