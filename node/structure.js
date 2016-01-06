var cheerio = require('cheerio');

var Structure = function() {
	this.classHeadings = [];
};

Structure.prototype.createSectionHeader = function(chp) {
    this.classHeadings.push(chp);
};

Structure.prototype.addClassToHeader = function(position, section) {
    this.classHeadings[position].addClassToHeader(section);
};

Structure.prototype.getSectionHeaderCount = function() {
    return this.classHeadings.length;
};

Structure.prototype.getClassHeader = function(index) {
    return this.classHeadings[index];
};

Structure.prototype.getClassSection = function(index1, index2) {
    return this.classHeadings[index1].classes[index2];
};

module.exports = {
    Structure: Structure
}