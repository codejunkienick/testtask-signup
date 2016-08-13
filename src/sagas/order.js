import { takeLatest } from 'redux-saga'
import { put, fork, call } from 'redux-saga/effects'
import { LOAD_ITEMS, LOAD_ITEMS_REQUEST, LOAD_ITEMS_FAILURE, LOAD_ITEMS_SUCCESS } from 'redux/modules/order';
import { api } from 'services';

export function* getItemsAsync() {
  yield put({type: LOAD_ITEMS_REQUEST});
  const {response, error} = yield call(api.getAvailableItems);
  if(response)
    yield put({type: LOAD_ITEMS_SUCCESS, data: response});
  else
    yield put({type: LOAD_ITEMS_FAILURE, error});
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC


export default function* root() {
  yield fork(takeLatest, LOAD_ITEMS, getItemsAsync);
}
