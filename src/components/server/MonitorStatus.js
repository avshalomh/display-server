import React, {Component} from 'react';
import {observer} from 'mobx-react';

require('../../styles/server/connection-status.stylus');
@observer
class MonitorStatus extends Component {

  render() {
    if (this.props.connected) {
      return (
        <div className="connected-wrapper">
          <span className="has-connections">{this.props.connected} Monitor(s)</span>
        </div>
      )
    } else {
      return (
        <div className="connected-wrapper">
          <span className="no-connection">No Connections</span>
        </div>
      )
    }
  }
}

export default MonitorStatus;
