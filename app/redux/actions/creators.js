const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function createRequestTypes(reducer, base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${createType(reducer, base)}_${type}`
		return acc
	}, {})
}
export function createType(reducer, base) {
  return `${reducer}/${base}`;
}

export function action(type, payload = {}) {
  return {type, ...payload}
}
