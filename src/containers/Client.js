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

	render() {
		console.log('Rendering Client');
			return (
				<div>
					<HtmlRenderer html={appState.html}/>
					<DevTools />
				</div>
			);
	}
};

export default Client;
