import cheerio from 'cheerio';

class ResultPageParser {
    constructor(body) {
        this.$ = cheerio.load(body);

        this.parseCounter = 0;
        this.headings = resultsToArray(this.$, 'div[id^=win0divSSR_CLSRSLT_WRK_GROUPBOX2GP]', 'text');
        this.classesPerHeadings = resultsToArray(this.$, 'table[id^=\'ACE_$ICField48\']', 'size');
        this.nbr = resultsToArray(this.$, 'a[id^=MTG_CLASS_NBR]', 'text');
        this.section = resultsToArray(this.$, 'a[id^=MTG_CLASSNAME]', 'html');
        this.status = resultsToArray(this.$, 'img[class=SSSIMAGECENTER]', 'alt');
        this.room = resultsToArray(this.$, 'span[id^=MTG_ROOM]', 'text');
        this.time = resultsToArray(this.$, 'span[id^=MTG_DAYTIME]', 'text');
        this.instructors = resultsToArray(this.$, 'span[id^=MTG_INSTR]', 'text');
    }

    incrementCounter() {
        this.parseCounter += 1;
    }

    headingSize() {
        return this.headings.length;
    }

    getHeadings() {
        return this.headings[this.parseCounter];
    }

    getClassesPerHeading() {
        return this.getClassesPerHeading[this.parseCounter];
    }

    getNbr() {
        return this.nbr[this.parseCounter];
    }

    getSection() {
        return this.section[this.parseCounter];
    }

    getStatus() {
        return this.status[this.parseCounter];
    }

    getRoom() {
        return this.room[this.parseCounter];
    }

    getTime() {
        return this.time[this.parseCounter];
    }

    getInstr() {
        return this.instructors[this.parseCounter];
    }
}

function resultsToArray(body, parseString) {
    const results = body(parseString);
    const resultsArray = [];

    results.each(function(i, elem) {
        resultsArray[i] = body(this);
    });

    return resultsArray;
}

function resultsToArray(body, parseString, attr) {
    const results = body(parseString);
    const resultsArray = [];

    results.each(function(i, elem) {
        if(attr === 'alt') {
            resultsArray[i] = body(this).attr('alt');
        } else if (attr === 'text') {
            resultsArray[i] = body(this).text().trim();
        } else if (attr === 'html') {
            resultsArray[i] = body(this);
        } else if (attr === 'size') {
            resultsArray[i] = body(this).children().length;
        }
        else {
            resultsArray[i] = body(this);
        }
    });

    return resultsArray;
}

export default ResultPageParser;