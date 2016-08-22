import Immutable from 'immutable';
import { ITEMS, ADD, REMOVE }  from '../actions/order';

const initialState = Immutable.fromJS({
  loaded: false,
  ordered: Immutable.Map()
}) 

export default function order(state = initialState, action = {}) {
  const { itemId, response, error } = action;
  switch (action.type) {
    case ITEMS.REQUEST: 
      return state.set('loading', true);
    case ITEMS.SUCCESS:
      return state.delete('loading').set('loaded', true).set('items', response.items);
    case ITEMS.FAILURE:
      return state.delete('loading').set('loaded', false).set('error', error);
    case ADD: 
      if (!itemId) return state;
      return state.setIn(['ordered', itemId], state.getIn(['ordered', itemId], 0) + 1);
    case REMOVE: 
      if (state.getIn(['ordered', itemId]) <= 1) return state.deleteIn(['ordered', itemId]);
      return state.setIn(['ordered', itemId], state.getIn(['ordered', itemId]) - 1);
    default:
      return state;
  }
}

