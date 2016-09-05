import {render} from 'react-dom';
import {Router, Route, browserHistory}from 'react-router';
import React from 'react';
import Client from './containers/Client';
import MonitorSetter from './components/MonitorSetter';
import appState from './services/AppState';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

require('./styles/main.css');

const redirectNoMonitor = (nextState, replace) => {
  if (!appState.monitorName) {
    replace({
      pathname: '/setMonitor'
    });
  }
};

const clearMonitorName = () => {
  appState.monitorName = null;
};

render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/setMonitor" component={MonitorSetter} onEnter={clearMonitorName}/>
      <Route path="/" component={Client} onEnter={redirectNoMonitor}/>
    </Router>
  </MuiThemeProvider>
), document.getElementById('root'));