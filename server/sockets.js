const socketIo = require('socket.io');
let io;
var monitorHandler;

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
      this.monitorHandler.registerClientMonitor(name);
    });

    socket.on('ServerConnected', () => this.handleServerConnected(socket));
  }

  handleServerConnected(socket) {
    this.serverSockets.push(socket);
    socket.emit('monitors', this.monitorHandler.monitors);
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
  }

  emit() {
    console.warn('Emit was called before connection');
  }
}



module.exports = new SocketManager();