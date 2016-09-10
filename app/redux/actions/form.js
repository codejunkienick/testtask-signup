import { createRequestTypes, createType, action } from './creators';

const prefix = 'form';

export const SIGNUP = createRequestTypes(prefix, 'SIGNUP');

export const submit = (nickname, email, password) => action(SIGNUP.REQUEST, {nickname, email, password});

