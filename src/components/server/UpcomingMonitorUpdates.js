import React, { Component } from 'react';
import {observer} from 'mobx-react';
import serverState from '../../services/ServerState';
import {toJS} from 'mobx';
import _ from 'lodash';
class UpcomingMonitorUpdates extends Component {

  state = {
    selected: null
  };

  render() {
    let items = (<span></span>);
    if (this.props.monitor.schedule) {
      items = _.map(this.props.monitor.schedule, (s) => {
        let time = new Date(s.time);
        return (
          <div key={s.time}>
            <span>Time: {time.toString()}</span>
            <span>Html: {s.html.substring(0, 200)}</span>
          </div>
        );
      });
    }
      return (
        <div>
          {items}
        </div>
      );
  }
}


export default UpcomingMonitorUpdates;
