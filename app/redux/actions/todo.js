import { createRequestTypes, createType, action } from './creators';

const prefix = 'todo';

export const TODOS = createRequestTypes(prefix, 'TODOS');
export const ADD = createRequestTypes(prefix, 'ADD');
export const REMOVE = createRequestTypes(prefix, 'REMOVE');

export const todos = {
  request: () => action(TODOS.REQUEST),
  success: () => action(TODOS.SUCCESS, {response}),
  failure: () => action(TODOS.FAILURE, {error}),
};

export const load = () => action(TODOS.REQUEST);
export const add = (text) => action(ADD.REQUEST, {todo: text});
export const remove = (itemId) => action(REMOVE.REQUEST, {todoId});

