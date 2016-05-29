const MultiRowSection = function(overhead, handler) {
    this.htmlKey = overhead.htmlKey;
    this.nbr = overhead.nbr;
    this.section = overhead.section;
    this.status = overhead.status;
    this.enrollmentInfo = null;

    this.time = handler.timeArray;
    this.room = handler.roomArray;
    this.instr = handler.instrArray;
};

export default MultiRowSection;