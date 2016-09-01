import React, { Component } from 'react';
import appState from '../services/AppState';
import io from '../services/socketManager';

class MonitorSetter extends Component {

  render() {
    return (
      <div>
        Set the monitor name
        <input onChange={this.onChange}/>
        <button onClick={this.onConfirm}>Ok</button>
      </div>
    );
  };


  onChange = (e) => {
    this.monitorName = e.target.value;
  };

  onConfirm = (e) => {
    if (this.monitorName.length) {
      appState.monitorName = this.monitorName;
    }
    this.context.router.push({path:'/'});
  }
}

MonitorSetter.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MonitorSetter;
