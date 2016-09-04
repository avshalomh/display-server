import React, { Component } from 'react';
import appState from '../services/AppState';
import io from '../services/socketManager';
import _ from 'lodash';
class MonitorSetter extends Component {
  state = {

  };

  componentWillMount() {
    io.socket.emit('fetchMonitors');
    io.socket.on('monitors', (monitors) => {
      this.setState({
        monitors: monitors
      });
    })
  }
  render() {
    if (this.state.monitors) {
      let list = _.map(this.state.monitors, (value, key) => {
        return (
          <div key={key} onClick={this.setMonitor.bind(null, key)}>{key}</div>
        )
      });
      return (
        <div>
          <h3>
            Select Monitor
          </h3>
          <div>{list}</div>
        </div>

      )
    } else {
      return (
        <div>Fetching monitors</div>
      )
    }
  };


  setMonitor = (monitorName) => {
    appState.monitorName = monitorName;
    this.context.router.push({path:'/'});
  };

  componentWillUnmount = () => {
    console.log('Unmounting');
    io.socket.off('monitors');
  }
}

MonitorSetter.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MonitorSetter;
