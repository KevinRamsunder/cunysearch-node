import colors from 'colors';
import Bot from '../utils/bot.js';
import queue from '../utils/asyncQueue.js';

// get search results from cuny and return to front-end
export default function searchRequest(req) {
    // create new session
    req.session.bot = new Bot();
    console.log("Received request at /search-request");

    // if session already exists, continue that session
    if(req.session.user === undefined) {
        req.session.user = req.sessionID;
        console.log((`session created @ ${req.session.id}`).yellow);
    } else {
        console.log((`Return to session @ ${req.session.id}`).yellow);
    }

    if(req.body.inst === undefined) {
        req.session.save();
        return Promise.resolve(null);
    }

    // store parameters in session variable
    req.session.inst = req.body.inst.htmlKey;
    req.session.term = req.body.term.htmlKey;
    req.session.dept = req.body.dept.htmlKey;

    // construct payload for async queue
    const params = {
        bot: req.session.bot,
        inst: req.session.inst,
        term: req.session.term,
        dept: req.session.dept
    };

    // pass payload to async queue
    const func = queue.push(params, (val, newBot) => {
        console.log((`Cuny search complete. result length: ${val.length}`).green);
        req.session.bot = newBot;
        console.log(val);
        return Promise.resolve(val);
    });

    // save session
    req.session.save();

    // return value to client
    return Promise.resolve(func);
}