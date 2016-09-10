import Immutable from 'immutable';
import { SIGNUP }  from '../actions/form';

const initialState = Immutable.fromJS({
  signedUp: false,
}) 

export default function form(state = initialState, action = {}) {
  const { response, error } = action;
  switch (action.type) {
    case SIGNUP.REQUEST: 
      return state.set('loading', true);
    case SIGNUP.SUCCESS:
      return state.delete('loading').set('signedUp', true);
    case SIGNUP.FAILURE:
      return state.delete('loading').set('signedUp', false).set('error', error);
    default:
      return state;
  }
}

