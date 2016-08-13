import Immutable from 'immutable';

export const LOAD_ITEMS = 'starter-lapis/order/LOAD_ITEMS';
export const LOAD_ITEMS_REQUEST = 'starter-lapis/order/LOAD_ITEMS_REQUEST';
export const LOAD_ITEMS_SUCCESS = 'starter-lapis/order/LOAD_ITEMS_SUCCESS';
export const LOAD_ITEMS_FAILURE = 'starter-lapis/order/LOAD_ITEMS_FAILURE';
export const ADD = 'starter-lapis/order/ADD';
export const REMOVE = 'starter-lapis/order/REMOVE';

const initialState = Immutable.fromJS({
  loaded: false
})
export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ITEMS: 
      return state.set('loading', true);
    case LOAD_ITEMS_SUCCESS:
      return state.delete('loading').set('loaded', true);
    case LOAD_ITEMS_FAILURE:
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

export function isLoaded(globalState) {
  return globalState.order && globalState.order.loaded;
}

export function load() {
  return {
    type: LOAD_ITEMS
  };
}

export function add(itemId) {
  return {
    type: ADD,
    itemId: itemId
  };
}
export function remove(itemId) {
  return {
    type: ADD,
    itemId: itemId
  };
}
