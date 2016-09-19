import React, {Component} from 'react';
import {observer} from 'mobx-react';
import HtmlRenderer from '../components/HtmlRenderer';
import appState from '../services/AppState';
import FullScreen from '../components/FullScreen';
@observer
class Client extends Component {
	constructor(props) {
		super(props);
	}

	render() {
			return (
				<div>
					<HtmlRenderer html={appState.html}/>
					<FullScreen></FullScreen>
				</div>
			);
	}
};

export default Client;
