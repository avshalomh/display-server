import io from 'socket.io/node_modules/socket.io-client';
// was - import io from 'socket.io-client/socket.io';
// t

const socketIo = io.connect(window.location.host, {reconnect: true});

socketIo.on('connect', (con) => {
  console.log('socket connected', con);
});
socketIo.on('error', (err) => {
  if (err === "Authentication error") {
    window.location = '/login';
  }
});


var manager = {
  io: io,
  socket: socketIo
};
export default manager;
