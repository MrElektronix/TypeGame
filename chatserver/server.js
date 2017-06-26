var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("sijsifjis");

app.get('/', (req, res) => {
  res.sendfile('/public/index');
});

var socket = require ('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);
console.log('newConnection');
function newConnection(socket){

  console.log("socket");
}
