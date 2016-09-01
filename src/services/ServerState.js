import {observable, autorun} from 'mobx';
import io from './socketManager';

class AppState {
  @observable monitors = {};
  @observable selectedMonitor;

  constructor() {
    this.bindSockets();

  }

  bindSockets = () => {
    io.socket.emit('ServerConnected');
    io.socket.on('monitors', (monitors) => this.monitors = monitors);
    io.socket.on('monitorHtmlUpdate', (data) => this.monitors[data.name] = data.html);
  }

}
var state = new AppState();
export default state;
