import { createRequestTypes, createType, action } from './creators';

export const ITEMS = createRequestTypes('order', 'ITEMS');
export const ADD = createType('order', 'ADD');
export const REMOVE = createType('order', 'REMOVE');

export const items = {
  request: () => action(ITEMS.REQUEST),
  success: () => action(ITEMS.SUCCESS, {response}),
  failure: () => action(ITEMS.FAILURE, {error}),
};

export const load = () => action(ITEMS.REQUEST);
export const add = (itemId) => action(ADD, {itemId});
export const remove = (itemId) => action(REMOVE, {itemId});

