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
    _.forEach(monitors, (mon) => {
      mon.connected = 0;
    });
    this.monitors = monitors;
    this.monitorsSchedule = {};
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

  removeMonitor({name: name}) {
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


  clearMonitorSchedule(name) {
    let scheduled = this.monitorsSchedule[name];
    if (scheduled) {
      clearTimeout(scheduled);
    }
  }

  setMonitorSchedule({name, html, time}) {
    this.clearMonitorSchedule(name);
    let delay = time - Date.now();
    //do not set too high delay, they happen instantly
    if (delay >= 2147483647) {
      return;
    }
    this.monitorsSchedule[name] = setTimeout(() => {
      this.setMonitorHtml({name, html});
      this.removeSchedule({time, name});
    }, delay);
  }

  reSchedule() {
    let now = Date.now();
    _.forEach(this.monitors, (monitor, monitorName) => {
      monitor.schedule = _.filter(monitor.schedule, (s) => s.time > now - 60000);
      if (!monitor.schedule) {
        this.clearMonitorSchedule(monitorName);
        return;
      }
      let minTime = Number.MAX_SAFE_INTEGER;
      let scheduledHtml = '';
      _.forEach(monitor.schedule, (schedule) => {
        let time = schedule.time;
        if (time < minTime) {
          minTime = time;
          scheduledHtml = schedule.html;
        }
      });
      this.setMonitorSchedule({name: monitorName, html: scheduledHtml, time: minTime});
    });
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
    this.clearMonitorSchedule(name);
    _.remove(monitor.schedule, {time: time});
    this.reSchedule();
    this.emitMonitorsChanged();
  }
}

const Handler = new MonitorsHandler(monitors);

module.exports = {
  Handler
};