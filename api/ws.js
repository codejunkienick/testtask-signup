import { logger } from './helpers/logger';
export default function handleUserSocket(socket) {
  try {
    socket.on('signup', (data) => {
      console.log('attempt to signup', data);
      const { nickname, phone, password, email } = data;
      if (!nickname || !phone || !password || !email) return socket.emit('signup.error', {message: 'required fields are empty'});
      console.log('success');
      return socket.emit('signup.success'); 
    });
    socket.on('error', (err) => console.log(err));
  } catch (err) {
    logger.error(err);
  }
}
