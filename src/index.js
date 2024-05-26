const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// server (emit) ---- will go to ---> client (receive) - countUpdated
// client (emit) ---- will go to ---> server (receive) - increment
const port = process.env.PORT || 4000;
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// let count = 0;

io.on('connection', (socket) => {
  // socket.emit('countUpdate d', count);
  // socket.on('increment', () => {
  //   count += 1;
  //   io.emit('countUpdated', count);
  // });
  socket.emit('message', 'welcome');
  socket.broadcast.emit('message', 'A new user has joined');
  socket.on('sendMessage', (text, callback) => {
    const filter = new Filter();
    if (filter.isProfane(text)) {
      return callback('Profanity is not allowed');
    }
    io.emit('message', text);
    callback();
  });
  socket.on('sendLocation', (location, callback) => {
    socket.broadcast.emit('message', location);
    callback();
  });
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left');
  });
});

app.get('/', (req, res) => {
  res.send('hello world');
});

// Use the server instance to listen on the specified port
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
