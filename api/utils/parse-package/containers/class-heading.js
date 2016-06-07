class ClassHeading {
    constructor(chp) {
        this.title = chp.title;
        this.quantity = chp.quantity;
        this.classes = [];
    }

    addClassToHeading(section) {
        this.classes.push(section);
    }
}

export default ClassHeading;