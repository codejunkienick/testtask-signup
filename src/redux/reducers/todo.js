import Immutable from 'immutable';
import { TODOS, ADD, REMOVE }  from '../actions/todo';

const initialState = Immutable.fromJS({
  loaded: false,
  todos: []
}) 

export default function todo(state = initialState, action = {}) {
  const { itemId, response, error } = action;
  switch (action.type) {
    case TODOS.REQUEST: 
      return state.set('loading', true);
    case TODOS.SUCCESS:
      return state.delete('loading').set('loaded', true).set('items', response.items);
    case TODOS.FAILURE:
      return state.delete('loading').set('loaded', false).set('error', error);
    default:
      return state;
  }
}

