import Immutable from 'immutable';
import { TODOS, ADD, REMOVE }  from '../actions/form';

const initialState = Immutable.fromJS({
  loaded: false,
  todos: Immutable.List() 
}) 

export default function todo(state = initialState, action = {}) {
  const { itemId, response, error } = action;
  switch (action.type) {
    case TODOS.REQUEST: 
      return state.set('loading', true);
    case TODOS.SUCCESS:
      return state.delete('loading').set('loaded', true).set('items', Immutable.List(response));
    case TODOS.FAILURE:
      return state.delete('loading').set('loaded', false).set('error', error);
    case ADD.SUCCESS: 
      return state.set('items', state.get('items').push(action.todo));
    case REMOVE.SUCCESS: 
      return state.set('items', Immutable.List(response));
    default:
      return state;
  }
}

