import React, {Component} from 'react';
import io from '../../services/socketManager';
import _ from 'lodash';
import ScheduleAdder from './ScheduleAdder';

class UpcomingMonitorUpdates extends Component {

  state = {
    selected: null
  };

  removeSchedule = (name, time) => {
    io.socket.emit('removeSchedule', {name, time});
  };

  render() {
    let items = (<span>No Schedule</span>);
    if (this.props.monitor.schedule && this.props.monitor.schedule.length) {
      items = _.map(this.props.monitor.schedule, (s) => {
        let time = new Date(s.time);
        return (
          <li key={s.time}>
            <span>Time: {time.toString()}</span>
            <span>Html: {s.html.substring(0, 200)}</span>
            <span onClick={this.removeSchedule.bind(null, this.props.monitor.name, s.time)}>X</span>
          </li>
        );
      });
    }
    return (
      <div>
        <h3>{this.props.monitor.name} Schedule:</h3>
        <div>
          {items}
        </div>
        <ScheduleAdder monitor={this.props.monitor}/>
      </div>
    );
  }
}


export default UpcomingMonitorUpdates;
