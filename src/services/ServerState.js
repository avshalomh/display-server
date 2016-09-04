import {observable, autorun, toJS, computed} from 'mobx';
import io from './socketManager';
import _ from 'lodash';
class ServerState {
  @observable monitors = {};
  @observable selectedMonitor;

  constructor() {
    this.bindSockets();
  }

  @computed
  get arrayMonitors() {
    var results = [];
    for (var key in this.monitors) {
      var mon = {
        name: key
      };
      results.push(mon);
      _.merge(mon, this.monitors[key]);
    }
    return results;
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
      this.monitors = monitors
    });
    io.socket.on('monitorHtmlUpdate', ({name, html}) => this.monitors[name] = html);
    io.socket.on('monitorStatusChange', ({name, connected}) => {
      this.monitors[name].connected = connected;
    });
  }

}
var state = new ServerState();
export default state;
