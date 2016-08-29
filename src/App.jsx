import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import HtmlRenderer from './components/HtmlRenderer';
import io from './services/socketManager';

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.initialValue = props.appState.html;
  }
  render() {
    return (
      <div>
        <HtmlRenderer html={this.props.appState.html} />
        <textarea type="text" value={this.props.appState.initialValue} onChange={this.handleChange} />
        <DevTools />
      </div>
    );
  }

  handleChange = (event) => {
    io.socket.emit('change', event.target.value);
  }
}
;

export default App;
