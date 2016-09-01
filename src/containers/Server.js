import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ServerState from '../services/ServerState';
import io from '../services/socketManager';
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

    io.socket.emit('monitorHtmlChanged',{name, html});

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
    if (!this.state.selectedMonitor.html) {
      iframe.style.display = 'none';
      return;
    }
    iframe.style.display = 'block';
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
        </li>
      )
    });

		return (
			<ul>
        {monitors}
        <textarea ref="selectedMonitorHtml" onChange={this.handleHtmlChange} value={this.state.selectedMonitor.html} />
        <button onClick={this.updateMonitor}>Update</button>
        <iframe ref="previewFrame" ></iframe>
      </ul>
		);
	}
}
;

export default App;
