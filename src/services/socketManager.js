import io from 'socket.io-client/socket.io';
import appState from './AppState';
const socketIo = io.connect(window.location.host, {reconnect: true});
socketIo.on('connect', (con) => {
  console.log('socket connected', con);
});

socketIo.on('change', (data) => {
  console.log('Received data from server', data);
  appState.html = data;
});
var manager = {
  io: io,
  socket: socketIo
};

export default manager;