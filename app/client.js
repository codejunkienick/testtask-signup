/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ga from 'react-ga';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { Router, browserHistory, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createStore from './redux/create';
import getRoutes from './routes';
import DevTools from './containers/DevTools/DevTools';

const browserHistoryWithScroll = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(browserHistoryWithScroll, window.reduxState);
const history = syncHistoryWithStore(browserHistoryWithScroll, store, {
  selectLocationState(state) {
    return state.get('router').toJS();
  }
});

if (process.env.NODE_ENV === 'production') {
  ga.initialize(''); // Add Google ID for Google Analytics
}

function logPageView() {
  if (process.env.NODE_ENV === 'production') {
    ga.pageview(window.location.pathname);
  }
}

function initSocket() {
  const socket = io('', { path: '/ws' });
  return socket;
}

global.socket = initSocket();

const component = (
  <Router
    render={(props) => <RouterContext {...props} filter={item => !item.deferred} />}
    history={history}
    onUpdate={logPageView}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
