var cheerio = require('cheerio');

function parseResultBody(body) {
    $ = cheerio.load(body);

    console.log($('div#win0divGPSSR_CLSRSLT_WRK_GROUPBOX2').length);;
}

module.exports = {
    parseResultBody: parseResultBody
}