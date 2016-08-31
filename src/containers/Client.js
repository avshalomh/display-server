import React, {Component} from 'react';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import HtmlRenderer from '../components/HtmlRenderer';
import io from '../services/socketManager';
import appState from '../services/AppState';
import MonitorSetter from '../components/MonitorSetter';
@observer
class Client extends Component {
	constructor(props) {
		super(props);
	}
	
	clearMonitorName = () => {
		appState.monitorName = null;
	};
	
	render() {
		if (appState.monitorName) {
			return (
				<div>
					<HtmlRenderer html={appState.html}/>
					<textarea type="text" value={appState.initialValue} onChange={this.handleChange}/>
					<button onClick={this.clearMonitorName}>Change Monitor Name</button>
					<DevTools />
				</div>
			);
		} else {
			return (
				<MonitorSetter/>
			)
		}
	
	}

	handleChange = (event) => {
		io.socket.emit('change', event.target.value);
	}
}
;

export default Client;
