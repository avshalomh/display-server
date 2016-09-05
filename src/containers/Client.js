import React, {Component} from 'react';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import HtmlRenderer from '../components/HtmlRenderer';
import appState from '../services/AppState';
@observer
class Client extends Component {
	constructor(props) {
		super(props);
	}

	render() {
			return (
				<div>
					<HtmlRenderer html={appState.html}/>
					<DevTools />
				</div>
			);
	}
};

export default Client;
