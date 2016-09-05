import React, { Component } from 'react';
import {observer} from 'mobx-react';
import serverState from '../../services/ServerState';
import {toJS} from 'mobx';
import _ from 'lodash';
class UpcomingMonitorUpdates extends Component {

  state = {
    selected: null
  };

  render() {
      return (
        <div>{_.get(this.props,'monitor.schedule[0].time')}</div>
      );
  }
}


export default UpcomingMonitorUpdates;
