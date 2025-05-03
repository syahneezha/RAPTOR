const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('User terhubung');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // broadcast ke semua
  });

  socket.on('disconnect', () => {
    console.log('User terputus');
  });
});

server.listen(3000, () => console.log('Server aktif di http://localhost:3000'));
