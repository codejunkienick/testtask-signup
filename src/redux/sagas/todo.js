import { takeLatest } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'
import { api } from 'services';
import { TODOS, ADD, REMOVE } from 'redux/actions/todo';

export function* getTodosAsync() {
  const {response, error} = yield call(api.getTodos);
  if(response)
    yield put({type: TODOS.SUCCESS, response});
  else
    yield put({type: TODOS.FAILURE, error});
}
//TODO: Implement this method
export function* addTodoAsync(todo) {
}
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC


export default function* root() {
  yield fork(takeLatest, TODOS.REQUEST, getTodosAsync);
}
