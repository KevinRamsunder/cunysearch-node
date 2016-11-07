import Bot from '../utils/bot.js';
import queue from '../utils/asyncQueue.js';

// get seat info for a given class from cuny servers
export default function enrollmentRequest(req) {
  // create new bot for getting seat info
  req.session.searchBot = new Bot();

  // construct payload for async queue
  const params = {
    bot: req.session.searchBot,
    inst: req.session.inst,
    term: req.session.term,
    dept: req.session.dept,
    section: req.body.seatKey,
    nbr: req.body.classID
  };

  // pass payload to async queue,
  // return resolved JSON result from server
  return new Promise((resolve, reject) => {
    queue.push(params, (val, newBot) => {
      req.session.searchBot = newBot;

      let resolvedJSON = JSON.parse(val);
      resolvedJSON['nbr'] = params.nbr;
      console.log(resolvedJSON);
      resolve(resolvedJSON);
    });
  });
};