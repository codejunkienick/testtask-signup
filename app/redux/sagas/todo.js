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
export function* addTodoAsync(action) {
  const {response, error} = yield call(api.addTodo, action.todo);
  if(response)
    yield put({type: ADD.SUCCESS, response});
  else
    yield put({type: ADD.FAILURE, error});
}
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC


export default function* root() {
  yield fork(takeLatest, TODOS.REQUEST, getTodosAsync);
  yield fork(takeLatest, ADD.REQUEST, addTodoAsync);
}
