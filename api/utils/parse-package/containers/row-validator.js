const RowValidator = function(time) {
    this.rows = 1;

    for (let i = 0; i < time.length; i++) {
        if (time[i] === '<') {
            this.rows++;
        }
    }
};

export default RowValidator;

