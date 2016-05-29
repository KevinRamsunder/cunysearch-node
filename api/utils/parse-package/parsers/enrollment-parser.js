import cheerio from 'cheerio';
import Structure from './structure.js';
import ResultPageParser from './result-page-parser.js';

class EnrollmentParser {
    constructor(html) {
        const parser = new EnrollmentInfoParser(html);
        this.enrollment = EnrollmentInfo(parser);
    }

    getEnrollment() {
        const object = {
            'classCapacity': this.enrollment.classCapacity,
            'enrollmentTotal': this.enrollment.enrollmentTotal,
            'availableSeats': this.enrollment.availableSeats
        };

        return object;
    }
}

export default EnrollmentParser;