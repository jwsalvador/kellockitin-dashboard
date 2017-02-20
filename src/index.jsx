import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blueGrey500, blueGrey700} from 'material-ui/styles/colors';
import 'assets/styles/app.scss';
import routes from 'routes';
import configureStore from 'store/configureStore';
import {FetchGuests} from 'ducks/modules/Guests';

const store = configureStore();
store.dispatch(FetchGuests());

injectTapEventPlugin();

import App from './app';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
  },
  appBar: {
    height: 50,
  },
});

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router routes={routes} history={browserHistory}/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('App')
)