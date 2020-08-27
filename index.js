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

var messages = [];

var cookie = {
  index: 0
};

// Handle connections (on first connection)
io.on('connection', (socket) => {
  console.log('Client connected');

  // listen for chat message being emitted
  socket.on('chat message', (msg) => {
    messages.push(msg);           // add message to char array
    io.emit('chat message', msg); // send messages to everyone
  });

  // write entire array
  messages.forEach((msg) => socket.emit('chat message', msg));
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Broadcast updates
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// Display static HTML page (hopefully including JS)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Listen for chat message being emitted
//io.on('connection', (socket) => {
//
//});
