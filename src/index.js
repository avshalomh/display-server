import {render} from 'react-dom';
import {Router, Route, browserHistory}from 'react-router';
import App from './containers/App';
import React from 'react';
import Client from './containers/Client';

render((
  <Router history={browserHistory}>
    <Route path="/server" component={App}/>
    <Route path="/" component={Client}/>
  </Router>
), document.getElementById('root'));