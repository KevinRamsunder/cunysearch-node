var async = require('async');
var Bot = require('./bot.js');

ASYNC_TASK_LIMIT = 10;

var queue = async.queue(function(task, callback) {
    // block UI [loading indicator]
    // do web processing
    // return results
    // unblock UI [paste results]
    callback(task);
}, ASYNC_TASK_LIMIT);

module.exports = queue;