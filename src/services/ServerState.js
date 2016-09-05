import {observable, autorun, toJS, computed} from 'mobx';
import io from './socketManager';

class ServerState {
  @observable monitors = {};
  @observable selectedMonitor;

  constructor() {
    this.bindSockets();
    autorun(() => {
      console.log('Something changed in ServerState');
    })
  }

  addMonitor(name, monitor) {
    let monitors = toJS(this.monitors);
    monitors[name] = monitor;
    this.monitors = monitors;
    io.socket.emit('addMonitor', name);
  }

  bindSockets = () => {
    io.socket.emit('ServerConnected');
    io.socket.on('monitors', (monitors) => {
      this.monitors = monitors;
    });
    io.socket.on('monitorHtmlUpdate', ({name, html}) => this.monitors[name] = html);
    io.socket.on('monitorStatusChange', ({name, connected}) => {
      this.monitors[name].connected = connected;
    });
  }

}
var state = new ServerState();
export default state;
