var RowValidator = function(time) {
    this.rows = 1;

    for (var i = 0; i < time.length; i++) {
        if (time[i] === '<') {
            this.rows++;
        }
    }
};

module.exports = RowValidator;

