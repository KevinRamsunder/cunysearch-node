import cheerio from 'cheerio';

const SingleSectionParser = function(time, room, instr) {
    this.rowCount = 1;
    this.time = time;
    this.room = room;
    this.instr = instr;
};

export default SingleSectionParser;