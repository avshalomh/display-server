import React, { Component } from 'react';
import {observer} from 'mobx-react';

@observer
class MonitorStatus extends Component {

  render() {
    if (this.props.monitor.connected) {
      return (
        <span>{this.props.monitor.connected} Monitors Connected</span>
      )
    } else {
      return (
        <span>No Connections</span>
      )
    }
  }
}

export default MonitorStatus;
