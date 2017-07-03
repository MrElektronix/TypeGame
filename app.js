const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const users = [];

app.use(express.static('public/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on('connect', (socket) => {
  console.log("a user connected");

  socket.emit("joinGame", {
    id: socket.id,
    players: users
  });

  socket.on('makePlayer', (data) => {

    users.push(data);
    io.emit('new player connected', data);
    console.log("users-connected: " + users.length);
  });

  socket.on("word", (data) => {
    socket.broadcast.emit("displayingWord", data);
  });


  socket.on('moving', (data) =>{
    socket.broadcast.emit('player move', data);
  });


  socket.on('disconnect', () =>{
      let i = users.indexOf(socket.id);
      users.splice(i, 1);
      console.log("users-left: " + users.length);
      socket.broadcast.emit("playerDisconnect", {
          id: socket.id,
      });

  });

});


server.listen(3000, () => {
  console.log("listening on port 3000");
});
