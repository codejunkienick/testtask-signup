import { takeLatest } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'
import { api } from 'services';
import { SIGNUP } from 'redux/actions/form';

// export function* addTodoAsync(action) {
//   const {response, error} = yield call(api.addTodo, action.todo);
//   if(response)
//     yield put({ type: ADD.SUCCESS, todo: action.todo });
//   else
//     yield put({ type: ADD.FAILURE, error });
// }

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC


export default function* root() {
  // yield fork(takeLatest, TODOS.REQUEST, getTodosAsync);
}
