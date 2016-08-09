import Immutable from 'immutable';
const LOADED = 'starter-lapis/order/LOADED';
const ADD = 'starter-lapis/order/ADD';
const REMOVE = 'starter-lapis/order/REMOVE';

const initialState = Immutable.fromJS({
})
export default function info(state = initialState, action = {}) {
  switch (action.type) {
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
    type: LOADED
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
