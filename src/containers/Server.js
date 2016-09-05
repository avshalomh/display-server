import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ServerState from '../services/ServerState';
import io from '../services/socketManager';
import MonitorStatus from '../components/server/MonitorStatus';
import MonitorAdder from '../components/server/MonitorAdder';
import UpcomingMonitorUpdates from '../components/server/UpcomingMonitorUpdates';
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonitor: {}
    };
  }


  selectMonitor = (monitor) => {
    console.log('Selecting monitor', monitor);
    this.setState({
      selectedMonitor: monitor
    });
  };

  updateMonitor = () => {
    console.log('Updating monitor');
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
    console.log('Rendering');
    let monitors = ServerState.arrayMonitors.map((m) => {
      return (
        <li key={m.name} onClick={this.selectMonitor.bind(this, m)}>
          {m.name}
          <MonitorStatus monitor={m}/>
        </li>
      )
    });

    if (this.state.selectedMonitor.name) {

      return (
        <ul>
          {monitors}
          <MonitorAdder />
          <h3>{this.state.selectedMonitor.name ? this.state.selectedMonitor.name : 'No Monitor Selected'}</h3>
          <textarea ref="selectedMonitorHtml" onChange={this.handleHtmlChange} value={this.state.selectedMonitor.html}/>
          <button onClick={this.updateMonitor}>Update</button>
          <iframe ref="previewFrame"></iframe>
          <UpcomingMonitorUpdates monitor={this.state.selectedMonitor}/>
        </ul>
      );
    } else {
      return (
        <ul>
          {monitors}
          <MonitorAdder />
        </ul>
      );
    }
  }
}
;

export default App;
