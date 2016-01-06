var cheerio = require('cheerio');

var Structure = function() {
	var classHeadings = [];
};

Structure.prototype.createSectionHeader = function(chp) {
    classHeadings.push(chp);
};

Structure.prototype.addClassToHeader = function(position, section) {
    classHeadings[position].addClassToHeader(section);
};

Structure.prototype.getSectionHeaderCount = function() {
    return classHeadings.length;
};

Structure.prototype.getClassHeader = function(index) {
    return classHeadings[index];
};

Structure.prototype.getClassSection = function(index1, index2) {
    return classHeadings[index1].classes[index2];
};

module.exports = {
    Structure: Structure
}