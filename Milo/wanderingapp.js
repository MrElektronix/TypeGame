const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const users = [];

app.use(express.static('public/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/wandering/index.html");
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
    console.log(data);
    console.log("users: " + users.length);
  });

  socket.on('disconnect', () =>{
      let i = users.indexOf(socket.id);
      users.splice(i, 1);
      console.log("users-left: " + users.length);
  });

});


server.listen(3000, () => {
  console.log("listening on port 3000");
});
