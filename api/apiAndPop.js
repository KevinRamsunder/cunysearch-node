import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import mongo from '../api/utils/mongo.js';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

var FileStore = require('session-file-store')(session);

app.use(session({
    secret: 'eigso78r6fibilyglugrtdlkjyh57drkeo',
    store: new FileStore(),
    saveUninitialized: false,
    resave: false
}));

app.use(bodyParser.json());

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  mongo.populateDatabase(err => {
    if(err) {
      console.log('Cron Job unable to run.');
    }

    console.log( 'mongo db populated successfully.' );
    const runnable = app.listen(config.apiPort, (err) => {
      if (err) {
        console.error(err);
      }
      console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
      console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);

      io.on('connection', (socket) => {
        socket.emit('news', {msg: `'Hello World!' from server`});

        socket.on('history', () => {
          for (let index = 0; index < bufferSize; index++) {
            const msgNo = (messageIndex + index) % bufferSize;
            const msg = messageBuffer[msgNo];
            if (msg) {
              socket.emit('msg', msg);
            }
          }
        });

        socket.on('msg', (data) => {
          data.id = messageIndex;
          messageBuffer[messageIndex % bufferSize] = data;
          messageIndex++;
          io.emit('msg', data);
        });
      });
      io.listen(runnable);
    });
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
