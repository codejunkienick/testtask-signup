import { combineReducers } from 'redux-immutable';

import order from './order';
import router from './router';

export default combineReducers({
  order,
  router
});
