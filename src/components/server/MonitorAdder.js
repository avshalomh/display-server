import React, { Component } from 'react';
import {observer} from 'mobx-react';
import serverState from '../../services/ServerState';

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
    //TODO: socket update
  };

  get isDisabled() {
    console.log('Disabled', this.state);
    return this.state.alreadyExists || !this.state.tempMonitorName;
  }

  startAdd = () => {
    this.state.adding = true;
    this.updateState();
  };

  updateState() {
    this.setState(this.state);
  }

  render() {
    if (this.state.adding) {
      return (
        <span>
          <input onChange={this.onMonitorNameAdd}/>
          <button disabled={this.isDisabled} onClick={this.addMonitor}>Add</button>
        </span>
      )
    } else {
      return (
        <button onClick={this.startAdd}> Add New Monitor </button>
      );
    }

  }
}
;

export default MonitorAdder;
