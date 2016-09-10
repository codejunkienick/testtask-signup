//@flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

type RequestType = { [key: string]: string }

export function createRequestTypes(reducer: string, base: string) : RequestType {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${createType(reducer, base)}_${type}`
		return acc
	}, {})
}
export function createType(reducer: string, base: string) : string {
  return `${reducer}/${base}`;
}

export function action(type: string, payload: ?Object = {}) : Object {
  return {type, ...payload}
}
