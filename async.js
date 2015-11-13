var async = require('async');
var Bot = require('./bot');
var Timer = require('timer-machine')

ASYNC_TASK_LIMIT = 10;

var queue = async.queue(function(task, callback) {
    console.log('touched');
    
    var bot = new Bot.Bot();
    bot.submitSearch(task.inst, task.term, task.dept);

    callback(task);

}, ASYNC_TASK_LIMIT);

module.exports = {
    queue: queue
}