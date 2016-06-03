import qs from 'querystring';
import cheerio from 'cheerio';
import request from 'request';
import FormData from 'form-data';

import config from './config.js';
import formTemplate from './form.js';
import Parser from './parse-package/main-parser.js';

class InfoBot {
  constructor(callback) {
    const self = this;

    this.options = {
      url: config.cuny.longUrl,
      headers: config.cuny.headers,
      jar: request.jar()
    };

    request.post(this.options, (err, res, body) => {
      if(err) {
        console.error(err);
        return;
      }

      const parsed = cheerio.load(body);
      self.key = parsed(config.html.key).val();
      callback(self);
    });
  }

  // get institution list from CUNYFirst server
  getInstitutions(callback) {
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
      const results = parsed(config.html.inst).children();
      const parsedResults = [];

      parsed(results).each(function(i, elem) {
        const school = parsed(this).text().trim();
        const key = parsed(this).val().trim();

        if(school !== '' && school !== undefined) {
          parsedResults.push({school, htmlKey: key});
        }
      });

      callback(parsedResults);
    });
  }

  // get term list from CUNYFirst server
  getTerms(parsed) {
    // make results html into valid html
    let termResults = parsed(config.html.term).html();
    termResults = `<select id='term'>${termResults}</select>`;

    // parse extracted snippet of html
    parsed = cheerio.load(termResults);
    termResults = parsed('select[id=\'term\']').children();
    const parsedResults = [];

    parsed(termResults).each(function(i, elem) {
      const term = parsed(this).text().trim();
      const key = parsed(this).val().trim();

      if(term !== '' && term !== undefined) {
         parsedResults.push({term, htmlKey: key});
      }
    });

    return parsedResults;
  }

  // get department list from CUNYFirst server
  getDepts(parsed) {
    // make results html into valid html
    let deptResults = parsed(config.html.depts).html();
    deptResults = `<select id='depts'>${deptResults}</select>`;

    // parse extracted snippet of html
    parsed = cheerio.load(deptResults);
    deptResults = parsed('select[id=\'depts\']').children();
    const parsedResults = [];

    parsed(deptResults).each(function(i, elem) {
      const dept = parsed(this).text().trim();
      const key = parsed(this).val().trim();

      if(dept !== '' && dept !== undefined) {
         parsedResults.push({dept, htmlKey: key});
      }
    });

    return parsedResults;
  }

  // get updated terms and dept for the given inst
  parseXML(inst, callback) {
    const submit_options = {
      url: config.cuny.shortUrl,
      form: qs.stringify(formTemplate.termTemplate(this.key, inst.htmlKey)),
      headers: this.options.headers,
      jar: this.options.jar
    };

    request.post(submit_options, (err, res, body) => {
      request.post(submit_options, (err, res, body) => {
        if(err) {
          console.error(err);
        }

        // hack to fix cheerio shortcoming
        body = body.replace(/<!\[CDATA\[/ig, "$1");
        const parsed = cheerio.load(body);

        callback(inst, parsed);
      });
    });
  }
}

export default InfoBot;