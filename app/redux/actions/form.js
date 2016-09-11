//@flow
import { createRequestTypes, createType, action } from './creators';

const prefix: string = 'form';

export const SIGNUP = createRequestTypes(prefix, 'SIGNUP');


export const signup = {
  request: () => action(SIGNUP.REQUEST),
  success: () => action(SIGNUP.SUCCESS),
  failure: (error: Object) => action(SIGNUP.FAILURE, {error}),
}

