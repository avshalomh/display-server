let mobx = require('mobx');
let fs = require('fs');
let autorun = mobx.autorun;
let io = require('./sockets');
let _ = require('lodash');
var monitors;
try {
  monitors = JSON.parse(fs.readFileSync('./monitors.json','utf8'));
} catch (e) {
  monitors = {};
}

class MonitorsHandler {
  constructor(monitors = {}) {
    this.monitors = monitors;
    this.persistMonitors();
  }

  persistMonitors() {
    var forSave = _.cloneDeep(this.monitors);
    _.forEach(forSave, (value) => {
      console.log(value);
      delete value.connected;
    });
    fs.writeFile('./monitors.json', JSON.stringify(forSave, null, 2), 'utf8');
  }

  emitChange(name, html) {
    io.emit('monitorHtmlChanged', {name, html});
    this.persistMonitors();
  }

  emitMonitorsChanged() {
    io.updateMonitorsChanged(this.monitors);
    this.persistMonitors();
  }

  addMonitor(name) {
    if (this.monitors[name]) {
      return;
    }
    this.monitors[name] = {
      html: '',
      connections: 0
    };
    this.emitMonitorsChanged();

  }

  removeMonitor(name) {
    delete this.monitors[name];
    this.emitMonitorsChanged();
  }

  setMonitorHtml({name, html}) {
    console.log('Monitor html changed', name, html);
    if (!this.monitors[name]) {
      return;
    }
    //Update monitor HTML in the server as well
    this.monitors[name].html = html;
    this.emitChange(name, html);

  }

  registerClientMonitor(name) {
    console.log('Register client monitor', name, this.monitors[name]);
    if (this.monitors[name]) {
      this.emitChange(name, this.monitors[name].html);
      this.monitors[name].connected = this.monitors[name].connected || 0;
      this.monitors[name].connected++;
      let connected =  this.monitors[name].connected;
      io.serverEmit('monitorStatusChange', {name, connected});
    } else {
      this.emitChange(name, 'No Input');
    }
  }

  disconnectClientMonitor(name) {
    //console.log('Disconnect client monitor', name, this.monitors[name]);
    if (this.monitors[name] && this.monitors[name].connected) {
      this.monitors[name].connected--;
      let connected = this.monitors[name].connected;
      io.serverEmit('monitorStatusChange', {name, connected});
    }
  }
}

const Handler = new MonitorsHandler(monitors);

module.exports = {
  Handler
};