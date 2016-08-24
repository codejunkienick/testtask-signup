import 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import config from '../config';

// TODO: ADD Normalizr: https://github.com/gaearon/normalizr

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}
const headers = new Headers({
  'Accept': 'application/json, text/plain',
  "Content-Type": "application/json",
});
const defaultOptions = {
  headers,
  method: 'GET',
  cache: 'default'
};

function callApi(endpoint, options = defaultOptions) {
  const fullUrl = formatUrl(endpoint);
  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);
      return camelizedJson;
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' })
    );
}

function get(endpoint) { return callApi(endpoint); }

function post(endpoint, body) {
  return callApi(endpoint, {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export const getAvailableItems = () => get('/order/available-items');

export const getTodos = () => get('/todo');
export const addTodo = todo => post('/todo/add', todo);
export const removeTodo = id => post('/todo/remove', { id });
export const markTodo = id => post('/todo/mark', { id });
