const express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
http.listen(3000, () => {
  console.log('listening on *:3000');
});
