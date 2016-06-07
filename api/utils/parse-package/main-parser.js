import cheerio from 'cheerio';
import Structure from './structure.js';
import ClassHeadingParser from './parsers/class-heading-parser.js';
import ClassSectionParser from './parsers/class-section-parser.js';
import MultiSectionParser from './parsers/multi-section-parser.js';
import SingleSectionParser from './parsers/single-section-parser.js';
import ResultPageParser from './parsers/result-page-parser.js';
import ClassHeading from './containers/class-heading.js';
import EnrollmentInfo from './containers/enrollment-info.js';
import MultiRowSection from './containers/multi-row-section.js';
import SingleRowSection from './containers/single-row-section.js';
import RowValidator from './containers/row-validator.js';

class Parser {
    constructor(html) {
        const rpp = new ResultPageParser(html);
        this.classStructure = new Structure();

        for (let i = 0; i < rpp.headingSize(); i++) {
            const heading = this.getHeadingInfo(rpp, i);
            this.classStructure.createSectionHeader(heading);
            this.addClassesPerHeading(rpp, i);
        }
    }

    getParserNoRow(parser) {
        return new SingleSectionParser(parser.getTime(), parser.getRoom(), parser.getInstr());
    }

    getParser(row, parser) {
        return new MultiSectionParser(row.rows, parser.getTime(), parser.getRoom(), parser.getInstr());
    }

    getSection(ov, inv) {
        if (inv.timeArray !== undefined) {
            return new MultiRowSection(ov, inv);
        } else {
            return new SingleRowSection(ov, inv);
        }
    }

    getHeadingInfo(parser, i) {
        const chp = new ClassHeadingParser(parser.headings[i], parser.classesPerHeadings[i]);
        return new ClassHeading(chp);
    }

    getValidator(parser) {
        return new RowValidator(parser.getTime());
    }

    getOverhead(parser) {
        return new ClassSectionParser(parser.getNbr(), parser.getSection(), parser.getStatus());
    }

    addClassesPerHeading(parser, headingNumber) {
        const size = parseInt(this.classStructure.getClassHeader(headingNumber).quantity);

        for (let i = 0; i < size; i++) {
            const validator = this.getValidator(parser);
            const classSection = this.getClassSection(validator, parser);
            this.classStructure.addClassToHeader(headingNumber, classSection);
            parser.incrementCounter();
        }
    }

    getClassSection(rows, pars) {
        const overhead = this.getOverhead(pars);

        if (rows.rows === 1) {
            var handler = this.getParserNoRow(pars);
            return this.getSection(overhead, handler);
        } else {
            var handler = this.getParser(rows, pars);
            return this.getSection(overhead, handler);
        }
    }

    printClassStructure() {
        for (let i = 0; i < parseInt(this.classStructure.classHeadings.length); i++) {
            console.log(this.classStructure.getClassHeader(i).title);

            for (let j = 0; j < parseInt(this.classStructure.getClassHeader(i).quantity); j++) {
                const section = this.classStructure.getClassSection(i, j);
                console.log(`${section.nbr}\n${section.time}\n${section.room}\n${section.instr}\n${section.status}\n${section.htmlKey}\n`);
            }
        }
    }

    getJSON() {
        const jsonObject = {'results': []};

        for (let i = 0; i < parseInt(this.classStructure.classHeadings.length); i++) {
            const currentTitle = this.classStructure.getClassHeader(i).title;

            for (let j = 0; j < parseInt(this.classStructure.getClassHeader(i).quantity); j++) {
                const section = this.classStructure.getClassSection(i, j);
                const sectionJson = {};
                sectionJson['title'] = currentTitle;
                sectionJson['nbr'] = section.nbr;
                sectionJson['time'] = section.time;
                sectionJson['room'] = section.room;
                sectionJson['instr'] = section.instr;
                sectionJson['status'] = section.status;
                sectionJson['htmlKey'] = section.htmlKey;
                jsonObject['results'].push(sectionJson);
            }
        }

        return jsonObject;
    }
}

export default Parser;
