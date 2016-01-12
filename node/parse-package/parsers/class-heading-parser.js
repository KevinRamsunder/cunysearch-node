var cheerio = require('cheerio');

var ClassHeadingParser = function(title, quantity) {
    this.title = title;
    this.quantity = quantity / 2;
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