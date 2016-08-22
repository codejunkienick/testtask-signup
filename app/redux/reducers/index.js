import { combineReducers } from 'redux-immutable';

import order from './order';
import router from './router';
import todo from './todo';

export default combineReducers({
  order,
  todo,
  router
});
