import {render} from 'react-dom';
import {Router, Route, browserHistory}from 'react-router';
import React from 'react';
import Login from './components/login/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

require('./styles/main.css');

render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/login" component={Login}/>
    </Router>
  </MuiThemeProvider>
), document.getElementById('root'));