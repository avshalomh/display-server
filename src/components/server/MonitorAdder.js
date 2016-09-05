import React, {Component} from 'react';
import {observer} from 'mobx-react';
import serverState from '../../services/ServerState';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

require('../../styles/server/monitor-adder.stylus');
class MonitorAdder extends Component {

  state = {
    store: serverState,
    adding: false
  };

  onMonitorNameAdd = (e) => {
    this.state.tempMonitorName = e.target.value;
    this.state.alreadyExists = !!this.state.store.monitors[this.state.tempMonitorName];
    this.updateState();
  };

  addMonitor = () => {
    serverState.addMonitor(this.state.tempMonitorName, {
      html: '',
      connections: 0
    });
    this.state.adding = false;
    this.updateState();
  };

  get isDisabled() {
    return this.state.alreadyExists || !this.state.tempMonitorName;
  }

  startAdd = () => {
    this.state.adding = true;
    this.updateState();
  };

  updateState() {
    this.setState(this.state);
  }

  cancelAdd = () => {
    this.setState(Object.assign({}, this.state, {adding: false}));
  };

  render() {

    const buttonStyle = {
      marginRight: 12,
    };

    let contents = (
      <RaisedButton onClick={this.startAdd} label="+ Add New" primary={true}/>
    );
    if (this.state.adding) {
      contents = (
        <span className="monitor-adder-form">
          <TextField
            floatingLabelText="Monitor Name"
            onChange={this.onMonitorNameAdd}
          />
          <div className="form-buttons">
            <RaisedButton style={buttonStyle} label="Add" primary={true} disabled={this.isDisabled} onClick={this.addMonitor}/>
            <RaisedButton label="Cancel" secondary={true} onClick={this.cancelAdd}/>
          </div>
          
        </span>
      );
    }

    return (
      <div className="monitor-adder-container">
        {contents}
      </div>
    )
  }
}
;

export default MonitorAdder;
