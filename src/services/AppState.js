import {observable, autorun} from 'mobx';
import io from './socketManager';

class AppState {
  @observable html = '';
  @observable monitorName;

  constructor() {
    this.monitorName = localStorage.monitorName;
    io.socket.on('monitorHtmlChanged', ({name, html}) => {
      if (this.monitorName === name && this.monitorName) {
        this.html = html;
      }
    });
    if (this.monitorName) {
      io.socket.emit('registerMonitor', this.monitorName);
    }
    io.socket.on('connect', this.registerMonitor.bind(this));
    autorun(() => {
      this.registerMonitor();
    });
  }

  registerMonitor() {
    document.title = this.monitorName;
    io.socket.emit('registerMonitor', this.monitorName);
    localStorage.monitorName = this.monitorName;
  }

}
var state = new AppState();
export default state;
