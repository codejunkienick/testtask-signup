import { createRequestTypes, createType, action } from './creators';

const prefix = 'order';

export const ITEMS = createRequestTypes(prefix, 'ITEMS');
export const ADD = createType(prefix, 'ADD');
export const REMOVE = createType(prefix, 'REMOVE');

export const items = {
  request: () => action(ITEMS.REQUEST),
  success: () => action(ITEMS.SUCCESS, {response}),
  failure: () => action(ITEMS.FAILURE, {error}),
};

export const load = () => action(ITEMS.REQUEST);
export const add = (itemId) => action(ADD, {itemId});
export const remove = (itemId) => action(REMOVE, {itemId});

