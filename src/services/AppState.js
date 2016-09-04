import {observable, autorun} from 'mobx';
import io from './socketManager';

class AppState {
  @observable html = '';
  @observable monitorName;

  constructor() {
    this.monitorName = localStorage.monitorName;
    this.previousMonitorName = this.monitorName;
    io.socket.on('monitorHtmlChanged', ({name, html}) => {
      if (this.monitorName === name && this.monitorName) {
        this.html = html;
      }
    });
    if (this.monitorName) {
      io.socket.emit('registerMonitor', this.monitorName);
    }
    autorun(() => {
      if (this.monitorName && (this.previousMonitorName !== this.monitorName || !this.previousMonitorName)) {
        this.registerMonitor();
      }
    });
  }

  registerMonitor() {
    io.socket.emit('registerMonitor', this.monitorName);
    localStorage.monitorName = this.monitorName;
  }

}
var state = new AppState();
export default state;
