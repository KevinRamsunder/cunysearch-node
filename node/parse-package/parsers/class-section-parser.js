var cheerio = require('cheerio');

var ClassSectionParser = function(nbr, section, status) {
    this.nbr = nbr;
    this.section = section.replace('\n', ' ');
    this.section = section.replace('<br>', ' ');

        console.log("SECTION " + this.section)


    this.htmlKey = section.attr('id');
    this.status = status.attr('alt');
};

module.exports = ClassSectionParser;