const express = require('express');
const socketIO = require('socket.io');
var app = express();
//var http = require('http').createServer(app);
//var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
const INDEX = '/public/index.html';

// allow multiple files to be public
app.use(express.static('public')); 

const server = app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
                  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// Create a Socket.io server
const io = socketIO(server);

// Handle connections
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Broadcast updates
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// Display static HTML page (hopefully including JS)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Listen for chat message being emitted
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
