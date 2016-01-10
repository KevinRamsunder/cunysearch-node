var cheerio = require('cheerio');

var SingleSectionParser = function(time, room, instr) {
    this.rowCount = 1;
    this.time = time.text();
    this.room = room.text();
    this.instr = instr.text();
};

module.exports = SingleSectionParser;