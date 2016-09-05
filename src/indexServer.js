import {render} from 'react-dom';
import {Router, Route, browserHistory}from 'react-router';
import Server from './containers/Server';
import React from 'react';

require('./styles/main.css');

render((
  <Router history={browserHistory}>
    <Route path="/server" component={Server}/>
  </Router>
), document.getElementById('root'));