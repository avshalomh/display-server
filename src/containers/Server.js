import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ServerState from '../services/ServerState';
import io from '../services/socketManager';
import MonitorStatus from '../components/server/MonitorStatus';
import MonitorAdder from '../components/server/MonitorAdder';
import UpcomingMonitorUpdates from '../components/server/UpcomingMonitorUpdates';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';
require('../styles/server/main.stylus');

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonitor: {}
    };
  }


  selectMonitor = (monitor) => {
    this.setState({
      selectedMonitor: monitor
    });
  };

  updateMonitor = () => {
    var html = this.refs.selectedMonitorHtml.value;
    var name = this.state.selectedMonitor.name;
    if (!name || !html) {
      return;
    }

    io.socket.emit('monitorHtmlChanged', {name, html});

  };

  handleHtmlChange = (e) => {
    var m = this.state.selectedMonitor;
    m.html = e.target.value;
    this.setState({
      selectedMonitor: m
    });
  };

  componentDidUpdate = () => {
    var iframe = this.refs.previewFrame;
    if (!iframe) {
      return;
    }
    var d = iframe.contentDocument;
    d.open();
    d.write(this.state.selectedMonitor.html);
    d.close();
  };

  render() {
    let monitors = (
      <span>
        <List className="monitor-list-container">
          <h3>Monitors List</h3>
          {_.map(ServerState.monitors, (monitor, name)  => {
            monitor.name = name;
            return (
              <ListItem key={name} onClick={this.selectMonitor.bind(this, monitor)}>
                <div className="monitor-list-item">
                  <span title={name} className="monitor-list-name">{name}</span>
                  <MonitorStatus connected={monitor.connected}/>
                </div>
              </ListItem>
            );})
          }
        </List>
        <MonitorAdder />
      </span>
    );


    let hasSelected = this.state.selectedMonitor.name &&  ServerState.monitors[this.state.selectedMonitor.name];
    if (hasSelected) {
      let name = this.state.selectedMonitor.name;
      this.state.selectedMonitor = ServerState.monitors[this.state.selectedMonitor.name];
      this.state.selectedMonitor.name = name;
      return (
        <div className="server-container">
          <div className="list-container">
            {monitors}
          </div>
          <div className="selected-monitor-container">
            <h4>Update Monitor: {this.state.selectedMonitor.name ? this.state.selectedMonitor.name : 'No Monitor Selected'}</h4>
            <TextField ref="selectedMonitorHtml"
                       multiLine={true}
                       className="monitor-html-area"
                       rows={10}
                       style={{width: '100%'}}
                       rowsMax={10}
                       floatingLabelText="Monitor HTML"
                       onChange={this.handleHtmlChange}
                       value={this.state.selectedMonitor.html}/>
            <RaisedButton fullWidth={false} style={{width: 'auto'}} primary={true} label="Update" onClick={this.updateMonitor} />
            <h4>Monitor Preview:</h4>
            <iframe className="preview-iframe" ref="previewFrame"></iframe>
          </div>
          <UpcomingMonitorUpdates monitor={this.state.selectedMonitor}/>
        </div>
      );
    } else {
      return (
        <div className="server-container">
          <div className="list-container">
            {monitors}
          </div>
        </div>
      );
    }
  }
}
;

export default App;
