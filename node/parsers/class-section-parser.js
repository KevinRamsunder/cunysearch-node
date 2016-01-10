var cheerio = require('cheerio');

var ClassSectionParser = function(nbr, section, status) {
    this.nbr = nbr.text();
    this.section = section.text().replace('\n', ' ');
    this.htmlKey = section.attr('id');
    this.status = status.attr('alt');
};

module.exports = ClassSectionParser;