import cheerio from 'cheerio';

const ClassHeadingParser = function(title, quantity) {
    this.title = title;
    this.quantity = quantity / 2;
};

function resultsToArray(body, parseString) {
    const results = body(parseString);
    const resultsArray = [];

    results.each(function(i, elem) {
        resultsArray[i] = body(this);
    });

    return resultsArray;
}

export default ClassHeadingParser;