import {render} from 'react-dom';
import {Router, Route, browserHistory}from 'react-router';
import App from './containers/App';
import React from 'react';
import Client from './containers/Client';
import MonitorSetter from './components/MonitorSetter';
import appState from './services/AppState';

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
  <Router history={browserHistory}>
    <Route path="/server" component={App}/>
    <Route path="/setMonitor" component={MonitorSetter} onEnter={clearMonitorName}/>
    <Route path="/" component={Client} onEnter={redirectNoMonitor}/>
  </Router>
), document.getElementById('root'));