import async from 'async';

import Bot from './bot.js';

const ASYNC_TASK_LIMIT = 100;

// async queue for parallel processing
const queue = async.queue((task, callback) => {
    // if queue is given an initialized bot, recreate the bot instead of creating a new one
    let bot = !task.bot.key || !task.bot.submit_options ? new Bot() : new Bot(task.bot);

    // submit server connect, scrape and parse
    bot.submitSearch(task.inst, task.term, task.dept, task.nbr, (val, botRef) => {
        // if queue is given a class ID, submit am additional request to get the seat info
        if(!task.nbr) {
            botRef.submitClass('MTG_CLASSNAME$0', (val, botRef) => {
                callback(val, botRef);
            });
        } else {
            callback(val, botRef);
        }
    });
}, ASYNC_TASK_LIMIT);

export default queue;