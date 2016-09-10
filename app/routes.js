import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
    App,
    Home,
    NotFound,
    SignedUp
} from './containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes */ }
      <Route path="/home" component={Home} />
      <Route path="/signedup" component={SignedUp} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
