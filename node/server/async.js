var async = require('async');
var Bot = require('./bot');

ASYNC_TASK_LIMIT = 100;

var queue = async.queue(function(task, callback) {
    var bot;

    if(task.bot.key === undefined || task.bot.submit_options === undefined) {
        bot = new Bot();
    } else {
        bot = new Bot(task.bot);
    }

    if(task.nbr !== undefined) {
        bot.submitSeatSearch(task.inst, task.term, task.dept, task.nbr, function(val, botRef) {
            botRef.submitClass('MTG_CLASSNAME$0', function(val, botRef) {
                callback(val, botRef);
            });
        });
    } else {
        bot.submitSearch(task.inst, task.term, task.dept, function(val, botRef) {
            callback(val, botRef);   
        });
    }

}, ASYNC_TASK_LIMIT);

module.exports = queue;