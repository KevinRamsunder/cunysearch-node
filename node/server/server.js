// Queue --------------------------------------
var queue = require('./async');

function search(values) {
    queue.push({inst: values.inst, term: values.term, dept: values.dept}, function(val) {
        console.log(val);
        // res.send(val);
    });
}

search({inst: 'QNS01', term: '1162', dept: 'CSCI'});