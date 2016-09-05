import React, { Component } from 'react';
import appState from '../services/AppState';
import io from '../services/socketManager';
import _ from 'lodash';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
require('../styles/client/list.stylus');
class MonitorSetter extends Component {
  state = {

  };

  componentWillMount() {
    io.socket.emit('fetchMonitors');
    io.socket.on('monitors', (monitors) => {
      this.setState({
        monitors: monitors
      });
    });
  }
  render() {
    if (this.state.monitors) {
      let list = <List>{_.map(this.state.monitors, (value, key) => {
        return (
          <ListItem className="list-monitor" key={key} primaryText={key}
                    onClick={this.setMonitor.bind(null, key)}
                    leftIcon={<ContentInbox/>}
          />
        )
      })
      }</List>;
      return (
        <div className="list-container">
          <h3>
            Select Monitor
          </h3>
          <div>{list}</div>
        </div>

      )
    } else {
      return (
        <div className="list-container">
          <div className="list-fetching">Fetching monitors...</div>
        </div>
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
