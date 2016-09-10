import { combineReducers } from 'redux-immutable';

import form from './form';
import router from './router';

export default combineReducers({
  form,
  router
});
