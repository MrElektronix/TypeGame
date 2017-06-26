var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var users = [];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/typing/index.html");
});

io.on('connect', (socket) => {
  console.log("a user connected");
  socket.on('setUsername', (data) => {
    if (users.indexOf(data) > -1) {
      socket.emit('userExists', data + ' username is taken!');
    } else {
      users.push(data);
      socket.emit('userSet', {
        playerName: data,

      });
    }
  })
  socket.on('msg', (data) => {
    //send message to everyone
    io.emit('newmsg', data);
  })
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
