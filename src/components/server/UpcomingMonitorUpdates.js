import React, {Component} from 'react';
import io from '../../services/socketManager';
import _ from 'lodash';
import ScheduleAdder from './ScheduleAdder';
import RemoveIcon from 'material-ui/svg-icons/content/clear';
import {List, ListItem} from 'material-ui/List';
import FormattedDate from '../FormattedDate';
require('../../styles/server/schedule-container.stylus');

class UpcomingMonitorUpdates extends Component {
  state = {
    selected: null
  };

  removeSchedule = (name, time) => {
    io.socket.emit('removeSchedule', {name, time});
  };
  render() {
    let items = (<div className="no-schedule">No Schedule</div>);
    if (this.props.monitor.schedule && this.props.monitor.schedule.length) {
      items = (<List>
          { _.map(this.props.monitor.schedule, (s) => {
            let time = new Date(s.time);
            return (
              <ListItem key={s.time}>
                <div className="schedule-list-item">
                  <div className="date-time-html">
                    <FormattedDate date={time} />
                    <span title={s.html}>Html: {s.html.substring(0, 200)}</span>
                  </div>
                  <span onClick={this.removeSchedule.bind(null, this.props.monitor.name, s.time)}>
                    <RemoveIcon/>
                  </span>
                </div>
              </ListItem>
            );
          })
          }
        </List>
      )
    }
    return (
      <div className="schedule-container">
        <h3>{this.props.monitor.name} Schedule:</h3>
        <div className="schedule-list-container">
          {items}
        </div>
        <ScheduleAdder monitor={this.props.monitor}/>
      </div>
    );
  }
}


export default UpcomingMonitorUpdates;
