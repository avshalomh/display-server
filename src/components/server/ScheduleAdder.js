import React, {Component} from 'react';
import io from '../../services/socketManager';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FormattedDate from '../FormattedDate';

class ScheduleAdder extends Component {

  state = {
    html: '',
    time: new Date(),
    adding: false
  };

  onAddClick = () => {
    this.setState({html: '', time: new Date(), adding: true});
  };

  onTimeChange = (e) => {
    this.setState(Object.assign({}, this.state, {time: new Date(parseInt(e.target.value))}));
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
      let formattedTime = (new Date(parseFloat(this.state.time))).toString();
      let timevalue = this.state.time.valueOf();
      return (
        <div>
          <div>
            <h5>Select Time</h5>
            <TextField type="number"
                       value={this.state.time.valueOf()}
                       floatingLabelText="Schedule Time (in MS)"
                       onChange={this.onTimeChange}
                       />
            <FormattedDate date={this.state.time} />
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
