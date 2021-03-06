import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'app';
import Dashboard from 'containers/Dashboard/Dashboard';
import GuestsList from 'containers/Guest/GuestsList';
import Stats from 'containers/Stats/Stats';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard}/>
    <Route path="/guests" component={GuestsList}/>
    <Route path="/stats" component={Stats}/>
  </Route>
)