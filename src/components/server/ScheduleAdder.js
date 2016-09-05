import React, {Component} from 'react';
import io from '../../services/socketManager';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FormattedDate from '../FormattedDate';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class ScheduleAdder extends Component {

  state = {
    html: '',
    time: new Date(),
    adding: false
  };

  onAddClick = () => {
    this.setState({html: '', time: new Date(), adding: true});
  };


  onTimeChange = (e, v) => {
    this.setState(Object.assign({}, this.state, {time: v}));
  };

  cancel = (e) => {
    this.setState({html: '', time: Date.now(), adding: false});
  };

  onHtmlChange = (e) => {
    this.setState(Object.assign({}, this.state, {html: e.target.value}));
  };

  saveSchedule = (e) => {
    io.socket.emit('setSchedule', {name: this.props.monitor.name, html: this.state.html, time: this.state.time.valueOf()});
    this.setState({adding: false});
  };

  render() {
    if (this.state.adding) {
      return (
        <div>
          <h5>Create a new schedule</h5>
          <div className="date-time-container">
            <DatePicker
              style={{width: 100}}
              floatingLabelText="Select Date"
                        value={this.state.time} onChange={this.onTimeChange} />
            <TimePicker
              style={{width: 100, overflow: 'hidden'}}
              format="24hr"
              floatingLabelText="Select Time"
              value={this.state.time}
              onChange={this.onTimeChange}
            />
          </div>
          <TextField multiLine={true}
                     rows={5}
                     floatingLabelText="Scheduled HTML Contents"
                     value={this.state.html}
                     onChange={this.onHtmlChange}/>
          <RaisedButton style={{marginRight: 10}} onClick={this.saveSchedule} label="Save" primary={true} />
          <RaisedButton onClick={this.cancel} label="Cancel" secondary={true} />
        </div>
      )
    } else {
      return (
        <RaisedButton label="+ Add Schedule" onClick={this.onAddClick} primary={true} />
      )
    }
  }
}


export default ScheduleAdder;
