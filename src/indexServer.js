import {render} from 'react-dom';
import {Router, Route, browserHistory}from 'react-router';
import Server from './containers/Server';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
require('./styles/main.css');

render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/server" component={Server}/>
    </Router>
  </MuiThemeProvider>
), document.getElementById('root'));