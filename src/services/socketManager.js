import io from 'socket.io-client/socket.io';

const socketIo = io.connect(window.location.host, {reconnect: true});

socketIo.on('connect', (con) => {
  console.log('socket connected', con);
});

var manager = {
  io: io,
  socket: socketIo
};
export default manager;