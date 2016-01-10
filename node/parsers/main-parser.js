var cheerio = require('cheerio');
var Structure = require('./structure.js');

var Parser = function(html) {
    var rpp = new models.ResultPageParser(html);
    this.classStructure = new Structure();
};