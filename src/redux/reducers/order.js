import Immutable from 'immutable';
import { order } from '../actions';

const { ITEMS, ADD, REMOVE } = order;
const initialState = Immutable.fromJS({
  loaded: false
})
export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case ITEMS.REQUEST: 
      return state.set('loading', true);
    case ITEMS.SUCCESS:
      return state.delete('loading').set('loaded', true);
    case ITEMS.FAILURE:
      return state.delete('loading').set('loaded', false).set('error', action.error);
    case ADD: 
      const { itemId } = action;
      if (!itemId) return state;
      if (state.has(itemId)) return state.set(itemId, state.get(itemId) + 1);
      else return state.set(itemId, 1)
    case REMOVE: 
      if (state.get(itemId) <= 1) return state.delete(itemId);
      else return state.set(itemId, state.get(itemId))
    default:
      return state;
  }
}


