const socket = io();

let id;
let users;


socket.on('joinGame', (data) => {
    id = data.id;
    users = data.players;
    Init(data);

    users.forEach(player => {
        addPlayer(player);
    });

});

socket.on('playerDisconnect', obj =>{
    for (let i = 0; i < users.length; i++) {
        if(users[i].id === obj.id) {
            users.splice(i, 1);
        }
    }
    for (let i = 0; i < game.gameObjects.length; i++) {
        if(game.gameObjects[i].id === obj.id) {
           game.removeGameObject(obj.id);
        }
    }
});

let addPlayer = (data) => {
    const {player}  = data;
    game.addGameObject(new Rectangle(player.id, player.x, player.y, player.width, player.height, player.color, player.filled));
};

socket.on('new player connected',(data) => {
    addPlayer(data);
});

socket.on('player move', obj =>{
    for (let i = 0; i < users.length; i++) {
        if(users[i].id === obj.id) {
            users[i] = obj;
        }
    }
    for (let i = 0; i < game.gameObjects.length; i++) {
        if(game.gameObjects[i].id === obj.id) {

            game.gameObjects[i].x = obj.player.x;
            game.gameObjects[i].y = obj.player.y;
        }
    }
});


let input;
let game, player;
let canvas, context;

key = [];

document.addEventListener("keydown", (e) => {
  key[e.keyCode] = true;
});

document.addEventListener("keyup", (e) => {
  delete key[e.keyCode];
});


let Init = (data) => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  input = new Input(key);

  game = new Game(1200, 600, canvas, context);
  player = new Rectangle(data.id, Math.floor(Math.random() * 300), 100, 30, 30, "", true);


  socket.emit("makePlayer", {
    id: id,
    player: player,
  });

  animate();
};


let animate = () => {
  requestAnimationFrame(animate);
  keyBoard();
  game.update();
};


let keyBoard = () => {
    let speed = 5;
    if(input.onKeyDown("w")) {
        player.y -= speed;
    }

    if(input.onKeyDown("s")) {
        player.y += speed;
    }

    if(input.onKeyDown("a")) {
        player.x -= speed;
    }

    if(input.onKeyDown("d")) {
        player.x += speed;
    }



    socket.emit('keyPress', {
        id: id,
        player: player
    });






    /*
    socket.emit('keyPress', data);
    */
};


