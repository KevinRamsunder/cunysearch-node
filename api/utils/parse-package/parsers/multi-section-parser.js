import cheerio from 'cheerio';

const MultiSectionParser = function(rowCount, time, room, instr) {
    this.rowCount = rowCount;

    function stringToRegex(input) {
        // 'g' flag is used to match all instances of 'input'
        return new RegExp(input, "g");
    }

    tTime = time.html().replace(stringToRegex('<br />'), '\n');
    tRoom = room.html().replace(stringToRegex('<br />'), '\n');
    tInstr = instr.html().replace(stringToRegex('<br />'), '\n');
    
    this.timeArray = tTime.split('\n');
    this.roomArray = tRoom.split('\n');
    this.instrArray = tInstr.split('\n');
};

export default MultiSectionParser;