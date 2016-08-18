import { takeLatest } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'
import { api } from 'services';
import { order } from '../actions';

const { ITEMS, ADD, REMOVE } = order;
export function* getItemsAsync() {
  const items = yield select((state) => state.getIn(['order', 'items']));
  if (items && items.length > 0) return;
 
  const {response, error} = yield call(api.getAvailableItems);
  if(response)
    yield put({type: ITEMS.SUCCESS, response});
  else
    yield put({type: ITEMS.FAILURE, error});
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC


export default function* root() {
  yield fork(takeLatest, ITEMS.REQUEST, getItemsAsync);
}
