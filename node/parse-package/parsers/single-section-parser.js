var cheerio = require('cheerio');

var SingleSectionParser = function(time, room, instr) {
    this.rowCount = 1;
    this.time = time;
    this.room = room;
    this.instr = instr;
};

module.exports = SingleSectionParser;