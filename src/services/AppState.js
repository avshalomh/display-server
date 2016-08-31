import {observable, autorun} from 'mobx';
import io from './socketManager';

class AppState {
  @observable html = 'Hello';
  @observable monitorName;

  constructor() {
    this.monitorName = localStorage.monitorName;
    this.previousMonitorName = this.monitorName;
    autorun(() => {
      if (!this.monitorName && this.previousMonitorName) {
        io.socket.emit('clearMonitor', this.previousMonitorName);
      } else if (this.monitorName) {
        io.socket.emit('registerMonitor', this.monitorName);
        localStorage.monitorName = this.monitorName;
      }
      this.previousMonitorName = this.monitorName;
    });
  }

}
var state = new AppState();
export default state;
