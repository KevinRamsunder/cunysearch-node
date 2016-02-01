var cheerio = require('cheerio');

var EnrollmentInfoParser = function(htmlPage) {
    this.$ = cheerio.load(htmlPage);

    cap = resultsToArray(this.$, '[id=SSR_CLS_DTL_WRK_ENRL_CAP]');
    tot = resultsToArray(this.$, '[id=SSR_CLS_DTL_WRK_ENRL_TOT]');
    avail = resultsToArray(this.$, '[id=SSR_CLS_DTL_WRK_AVAILABLE_SEATS]');

    this.classCapacity = parseInt(cap[0], 10);
    this.classTotal = parseInt(tot[0], 10);
    this.classAvailable = parseInt(avail[0], 10);
};

function resultsToArray(body, parseString) {
    var results = body(parseString);
    var resultsArray = [];

    results.each(function(i, elem) {
        resultsArray[i] = body(this).text().trim();
    });

    return resultsArray;
}

module.exports = EnrollmentInfoParser;
