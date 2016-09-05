let mobx = require('mobx');
let fs = require('fs');
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
    this.reSchedule();
  }

  persistMonitors() {
    var forSave = _.cloneDeep(this.monitors);
    _.forEach(forSave, (value) => {
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
      connected: 0
    };
    this.emitMonitorsChanged();

  }

  removeMonitor(name) {
    delete this.monitors[name];
    this.emitMonitorsChanged();
  }

  setMonitorHtml({name, html}) {
    if (!this.monitors[name]) {
      return;
    }
    //Update monitor HTML in the server as well
    this.monitors[name].html = html;
    this.emitChange(name, html);

  }

  registerClientMonitor(name) {
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

  scheduleMonitorUpdate({monitor, monitorName, time, html}) {
    let delay = time - Date.now();
    setTimeout(() => {
      this.setMonitorHtml({name: monitorName, html});
      this.removeSchedule({time, name: monitorName});
    }, delay);

  }

  reSchedule() {
    clearTimeout(this.scheduleTimeout);
    let minTimeStamp = 0;
    let scheduledMonitor = null;
    let now = Date.now();
    _.forEach(this.monitors, (monitor, monitorName) => {
      if (!monitor.schedule) {
        return;
      }
      monitor.schedule = _.filter(monitor.schedule, (s) => s.time > now - 1000);
      _.forEach(monitor.schedule, (schedule) => {
        if ((!minTimeStamp || minTimeStamp < schedule.time) && schedule.time > (now - 1000) && schedule.html) {
          scheduledMonitor = {
            monitor,
            monitorName,
            time: schedule.time,
            html: schedule.html
          };
        }
      })
    });
    if (scheduledMonitor) {
      this.scheduleMonitorUpdate(scheduledMonitor);
    }
  }

  addMonitorSchedule({name, html, time}) {
    let monitor = this.monitors[name];
    if (!monitor) {
      return;
    }
    monitor.schedule = monitor.schedule || [];
    monitor.schedule.push({
      time: time,
      html: html
    });
    this.reSchedule();
    this.emitMonitorsChanged();
  }

  removeSchedule({time, name}) {
    let monitor = this.monitors[name];
    if (!monitor) {
      return;
    }
    _.remove(monitor.schedule, {time: time});
    this.reSchedule();
    this.emitMonitorsChanged();
  }
}

const Handler = new MonitorsHandler(monitors);

module.exports = {
  Handler
};