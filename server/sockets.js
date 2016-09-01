const socketIo = require('socket.io');
let io;
var monitorHandler;

var socketManager = {
  register: function(http, callback) {
    io = require('socket.io')(http);
    io.on('connection', (socket) => {
      console.log('connection!');
      var monitorHandler = require('./monitors').Handler;
      socket.on('registerMonitor', (name) => {
        console.log('Register monitor called', name);
        monitorHandler.registerClientMonitor(name);
      });
    });
    socketManager.emit = io.emit.bind(io);
  },
  emit: function() {
    console.warn('Emit was called before connection');
  }
};

module.exports = socketManager;