import {Account} from 'models/index';
import {logger} from 'helpers/logger';
export default async function handleUserSocket(socket) {
  try {
    const user = socket.user;

    socket.on('newMessage', (msg) => {
      console.log('[SOCKET] User ' + user.username + ' sends message to User ' + receiver.user.username);
      receiver.emit('newMessage', msg);
    });

  } catch (err) {
    logger.error(err);
  }
}
