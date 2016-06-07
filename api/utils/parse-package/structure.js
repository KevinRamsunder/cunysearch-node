import cheerio from 'cheerio';

class Structure {
    constructor() {
        this.classHeadings = [];
    }

    createSectionHeader(chp) {
        this.classHeadings.push(chp);
    }

    addClassToHeader(position, section) {
        this.classHeadings[position].addClassToHeading(section);
    }

    getSectionHeaderCount() {
        return this.classHeadings.length;
    }

    getClassHeader(index) {
        return this.classHeadings[index];
    }

    getClassSection(index1, index2) {
        return this.classHeadings[index1].classes[index2];
    }
}

export default Structure;