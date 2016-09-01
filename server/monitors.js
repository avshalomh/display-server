let mobx = require('mobx');
let fs = require('fs');
let autorun = mobx.autorun;
let io = require('./sockets');

var monitors;
try {
  monitors = JSON.parse(fs.readFileSync('./monitors.json','utf8'));
} catch (e) {
  monitors = {};
}

class MonitorsHandler {
  constructor(monitors = {}) {
    mobx.extendObservable(this, {
      monitors: monitors
    });

    for (var key in this.monitors) {
      if (this.monitors.hasOwnProperty(key)) {
        this.emitChange(key, this.monitors[key].html);
      }
    }
    autorun(() => {
      fs.writeFile('./monitors.json', JSON.stringify(this.monitors, null, 2), 'utf8');
    });
  }

  emitChange(name, html) {
    console.log('Emitting monitor html change', name, html);
    io.emit('monitorHtmlChanged', {name, html});
  }

  addMonitor(name) {
    if (this.monitors[name]) {
      return;
    } else {
      this.monitors[name] = {
        html: ''
      }
    }
  }

  removeMonitor(name) {
    delete this.monitors[name];
  }

  setMonitorHtml(name, html) {
    if (!this.monitors[name]) {
      return;
    }
    this.monitors[name].html = html;
    this.emitChange(name, html);
  }

  registerClientMonitor(name) {
    console.log('Register client monitor', name, this.monitors[name]);
    if (this.monitors[name]) {
      this.emitChange(name, this.monitors[name].html);
    }
  }
}

const Handler = new MonitorsHandler(monitors);

module.exports = {
  Handler
};