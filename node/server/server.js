var express = require('express');

var app = express();

app.use(express.static('../../public'));

app.listen(8000);

console.log("Running on 8000");

// var queue = require('./async');

// queue.push({inst: 'QNS01', term: '1162', dept: 'CSCI'});