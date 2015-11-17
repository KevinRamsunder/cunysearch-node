var cheerio = require('cheerio');

function parseResultBody(body) {
    var parsed = cheerio.load(body);
}

module.exports = {
    parseResultBody: parseResultBody
}