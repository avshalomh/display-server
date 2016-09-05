import React, { Component } from 'react';
import {observer} from 'mobx-react';

@observer
class MonitorStatus extends Component {

  render() {
    if (this.props.connected) {
      return (
        <span>{this.props.connected} Monitors Connected</span>
      )
    } else {
      return (
        <span>No Connections</span>
      )
    }
  }
}

export default MonitorStatus;
