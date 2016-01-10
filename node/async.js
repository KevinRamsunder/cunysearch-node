var async = require('async');
var bot = require('./bot');

ASYNC_TASK_LIMIT = 100;

var queue = async.queue(function(task, callback) {
    var bot = new bot.Bot();
    bot.submitSearch(task.inst, task.term, task.dept);

    callback(task);

}, ASYNC_TASK_LIMIT);

module.exports = {
    queue: queue
};