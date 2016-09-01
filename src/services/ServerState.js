import {observable, autorun, toJS} from 'mobx';
import io from './socketManager';

class ServerState {
  @observable monitors = {};
  @observable selectedMonitor;
  @observable arrayMonitors;

  constructor() {
    this.bindSockets();
    autorun(() => {
      console.log(toJS(this.monitors));
      this.arrayMonitors = [];
      for (var key in this.monitors) {
        this.arrayMonitors.push({
          name: key,
          html: this.monitors[key].html
        })
      }
    });
  }

  bindSockets = () => {
    io.socket.emit('ServerConnected');
    io.socket.on('monitors', (monitors) => this.monitors = monitors);
    io.socket.on('monitorHtmlUpdate', (data) => this.monitors[data.name] = data.html);
  }

}
var state = new ServerState();
export default state;
