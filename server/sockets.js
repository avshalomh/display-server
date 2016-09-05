class SocketManager {
  constructor() {
    this.sockets = [];
    this.serverSockets = [];
  }

  register(http) {
    this.io = require('socket.io')(http);
    this.registerEvents();
    this.monitorHandler = require('./monitors').Handler;
  }

  registerSocketEvents(socket) {
    socket.on('registerMonitor', (name) => {
      if (socket.monitorName !== name) {
        if (socket.monitorName) {
          this.monitorHandler.disconnectClientMonitor(socket.monitorName);
        }
        this.monitorHandler.registerClientMonitor(name);
        socket.monitorName = name;
      }
    });

    socket.on('disconnect', () => {
      if (socket.monitorName) {
        this.monitorHandler.disconnectClientMonitor(socket.monitorName);
        delete socket.monitorName;
      }
    });

    socket.on('fetchMonitors', () => {
      socket.emit('monitors', this.monitorHandler.monitors);
    });

    socket.on('ServerConnected', () => this.handleServerConnected(socket));
  }

  handleServerConnected(socket) {
    console.log('Server connected');
    this.serverSockets.push(socket);
    socket.emit('monitors', this.monitorHandler.monitors);
    socket.on('monitorHtmlChanged', this.monitorHandler.setMonitorHtml.bind(this.monitorHandler));
    socket.on('addMonitor', this.monitorHandler.addMonitor.bind(this.monitorHandler));
    socket.on('setSchedule', this.monitorHandler.addMonitorSchedule.bind(this.monitorHandler));
    socket.on('removeSchedule', this.monitorHandler.removeSchedule.bind(this.monitorHandler));
  }

  updateMonitorsChanged(monitors) {
    this.serverSockets.forEach((s) => s.emit('monitors', monitors));
  }

  registerEvents() {
    this.io.on('connection', (socket) => {
      this.sockets.push(socket);
      this.registerSocketEvents(socket);
    });
    this.emit = this.io.emit.bind(this.io);
    this.serverEmit = (name, data) => {
      this.serverSockets.forEach((s) => s.emit(name, data));
    }
  }

  emit() {
    console.warn('Emit was called before connection');
  }
}



module.exports = new SocketManager();