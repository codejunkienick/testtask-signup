import 'babel-polyfill';
import http from 'http';
import express from 'express';
import session from 'express-session';
import httpLogger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import _ from 'lodash';
import SocketIo from 'socket.io';
import { logger, middleware as requestMiddleware } from './helpers/logger';
import handleUserSocket from './ws';
import config from './config';

const app = express();
const server = new http.Server(app);
const io = new SocketIo(server);

app.use(cookieParser(config.secret));
app.use(session({
  secret: config.secret,
  key: 'usersid',
  cookie: { maxAge: 1200000 },
  resave: false,
  saveUninitialized: false
}));
app.use(httpLogger('dev'));
app.use(requestMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(config.projectDir + '/public'));

// Log errors
app.use((err, req, res, next) => {
  if (err) {
    logger.error(err);
    next(err);
  }
});


if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      logger.error(err);
    }
    console.log('----\n==>  API is running on port %s', config.apiPort);
    console.log('==>  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.listen(runnable);

  io.on('connection', (socket) => {
    handleUserSocket(socket);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
