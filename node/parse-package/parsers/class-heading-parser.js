var cheerio = require('cheerio');

var ClassHeadingParser = function(title, quantity) {
    this.title = title;
    
    this.$ = cheerio.load(quantity);
    this.array = resultsToArray(this.$, '[id^=win0divMTG_CLASS_NBR]');
    this.quantity = this.array.length;
};

function resultsToArray(body, parseString) {
    var results = body(parseString);
    var resultsArray = [];

    results.each(function(i, elem) {
        resultsArray[i] = body(this).text().trim();
    });

    return resultsArray;
}

module.exports = ClassHeadingParser;