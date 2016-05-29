import qs from 'querystring';
import request from 'request';
import cheerio from 'cheerio';
import FormData from 'form-data';

import formTemplate from './form.js';
import config from './config.js';
import Parser from './parse-package/main-parser.js';
import EnrollmentInfoParser from './parse-package/parsers/enrollment-info-parser.js';

class Bot {
    constructor() {
        // if not init_bot param is provided
        if(arguments.length === 0) {
            this.key = undefined;

            this.submit_options = {
                url: config.cuny.shortUrl,
                form: undefined,
                headers: undefined,
                jar: undefined
            }
        } else {
            // if an init_bot param IS provided
            this.key = arguments[0].key;
            this.submit_options = arguments[0].submit_options;
        }
    }

    // submit custom search to CUNYFirst server
    submitSearch(inst, term, dept, nbr, callback) {
        const self = this;

        const options = {
            url: config.cuny.longUrl,
            headers: config.cuny.headers,
            jar: request.jar()
        };

        request.post(options, (err, res, body) => {
            if(err) {
                console.error(err);
                return;
            }

            const parsed = cheerio.load(body);
            self.key = parsed(config.html.key).val();

            self.submit_options.headers = options.headers;
            self.submit_options.jar = options.jar;

            self.submit_options.form = nbr === undefined ?
                formTemplate.getTemplate(self.key, inst, term, dept) :
                formTemplate.fullSeatTemplate(self.key, inst, term, dept, nbr);

            request.post(self.submit_options, (err, res, body) => {
                request.post(self.submit_options, (err, res, body) => {
                    const parser = new Parser(body);
                    let results = parser.getJSON();
                    results = JSON.stringify(results, null, 2);
                    callback(results, self);
                });
            });
        });
    }

    // submit custom class to get seat information
    submitClass(section, callback) {
        const self = this;

        self.submit_options.form = qs.stringify(formTemplate.enrollmentTemplate(self.key, section));

        request.post(self.submit_options, (err, res, body) => {
            const parser = new EnrollmentInfoParser(body);

            let results = {
                classCapacity: parser.classCapacity,
                classTotal: parser.classTotal,
                classAvailable: parser.classAvailable
            };

            results = JSON.stringify(results, null, 2);
            callback(results, self);
        });
    }
}

export default Bot;