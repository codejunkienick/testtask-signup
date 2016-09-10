import { logger } from './helpers/logger';
import validator from 'validator';

export default function handleUserSocket(socket) {
  try {
    socket.on('signup', (data) => {
      const { nickname, phone, password, email } = data;
      if (!nickname || !phone || !password || !email) return socket.emit('signup.error', { message: 'required fields are empty' });
      if (!validator.isEmail(email)) return socket.emit('signup.error', { message: 'email is not valid' });
      if (!validator.isMobilePhone(phone, 'ru-RU')) return socket.emit('signup.error', { message: 'phone is not valid' });

      return socket.emit('signup.success'); 
    });
    socket.on('error', (err) => console.log(err));
  } catch (err) {
    logger.error(err);
  }
}
