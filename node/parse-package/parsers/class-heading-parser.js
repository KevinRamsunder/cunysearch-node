var cheerio = require('cheerio');

var ClassHeadingParser = function(title, quantity) {
    this.title = title;
    this.$ = cheerio.load(quantity);
    this.quantity = quantity.children().length;
};

function resultsToArray(body, parseString) {
    var results = body(parseString);
    var resultsArray = [];

    results.each(function(i, elem) {
        resultsArray[i] = body(this);
    });

    return resultsArray;
}

module.exports = ClassHeadingParser;