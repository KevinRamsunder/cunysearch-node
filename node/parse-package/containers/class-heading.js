var ClassHeading = function(chp) {
    this.title = chp.title;
    this.quantity = chp.quantity;
    this.classes = [];
};

ClassHeading.prototype.addClassToHeading = function(section) {
    this.classes.push(section);
};

module.exports = ClassHeading;