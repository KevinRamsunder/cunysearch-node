import cheerio from 'cheerio';

const EnrollmentInfoParser = function(htmlPage) {
    this.$ = cheerio.load(htmlPage);

    let cap = resultsToArray(this.$, '[id=SSR_CLS_DTL_WRK_ENRL_CAP]');
    let tot = resultsToArray(this.$, '[id=SSR_CLS_DTL_WRK_ENRL_TOT]');
    let avail = resultsToArray(this.$, '[id=SSR_CLS_DTL_WRK_AVAILABLE_SEATS]');

    this.classCapacity = parseInt(cap[0], 10);
    this.classTotal = parseInt(tot[0], 10);
    this.classAvailable = parseInt(avail[0], 10);
};

function resultsToArray(body, parseString) {
    const results = body(parseString);
    const resultsArray = [];

    results.each(function(i, elem) {
        resultsArray[i] = body(this).text().trim();
    });

    return resultsArray;
}

export default EnrollmentInfoParser;
