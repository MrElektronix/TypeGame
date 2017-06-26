const socket = io();

let id;
let users;


socket.on('joinGame', (data) => {
    id = data.id;
    users = data.players;
    Init();
});

socket.on('new player connected',(data) => {

  users.push(data);
  console.log(data);

});



let input;
let game, player, playerSpeed;
let canvas, context;

key = [];

document.addEventListener("keydown", function(e) {
  key[e.keyCode] = true;
});

document.addEventListener("keyup", function(e) {
  delete key[e.keyCode];
});
  


let Init = () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  playerSpeed = 0;

  input = new Input(key);

  game = new Game(1200, 600, canvas, context);
  player = new Rectangle(30, 100, 30, 30, "", true);

  socket.emit("makePlayer", {
    id: id,
    player: player,

  });

  game.addGameObject(player);

  animate();
};


function animate() {
  requestAnimationFrame(animate);

  game.update();
}

