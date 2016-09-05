import React, {Component} from 'react';
import io from '../../services/socketManager';

class ScheduleAdder extends Component {

  state = {
    html: '',
    time: Date.now(),
    adding: false
  };

  onAddClick = () => {
    this.setState({html: '', time: Date.now(), adding: true});
  };

  onTimeChange = (e) => {
    this.setState(Object.assign({}, this.state, {time: parseFloat(e.target.value)}));
  };

  cancel = (e) => {
    this.setState({html: '', time: Date.now(), adding: false});
  };

  onHtmlChange = (e) => {
    this.setState(Object.assign({}, this.state, {html: e.target.value}));
  };

  saveSchedule = (e) => {
    io.socket.emit('setSchedule', {name: this.props.monitor.name, html: this.state.html, time: this.state.time});
    this.setState({adding: false});
  };

  render() {
    if (this.state.adding) {
      let formattedTime = (new Date(parseFloat(this.state.time))).toString();
      return (
        <div>
          <div>
            <b>Time:</b> (in MS) <input type="number" value={this.state.time} onChange={this.onTimeChange}/>
            <i>{formattedTime}</i>
          </div>
          <div>
            <b>HTML:</b> <textarea value={this.state.html} onChange={this.onHtmlChange}/>
          </div>
          <button onClick={this.saveSchedule}> Save</button>
          <button onClick={this.cancel}>Cancel</button>
        </div>
      )
    } else {
      return (
        <button onClick={this.onAddClick}>Add Schedule</button>
      )
    }
  }
}


export default ScheduleAdder;
