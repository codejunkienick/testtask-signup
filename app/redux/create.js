import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';

import * as sagas from './sagas';

export default function createStore(history, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [createMiddleware(), reduxRouterMiddleware, sagaMiddleware];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./reducers/index');
  const store = finalCreateStore(reducer, Immutable.fromJS(data));

  for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
  }


  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers/index', () => {
      store.replaceReducer(require('./reducers/index'));
    });
  }

  return store;
}
