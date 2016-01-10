var cheerio = require('cheerio');

var ClassHeadingParser = function(title, quantity) {
    this.title = title.text();
    this.title = this.title.substring(1, this.title.length - 1);

    this.$ = cheerio.load(quantity);
    this.array = (this.$, '[id^=win0divMTG_CLASS_NBR]');
    this.quantity = this.array.length;
};

module.exports = ClassHeadingParser;