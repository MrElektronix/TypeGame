const socket = io();

let id;
let users;


socket.on('joinGame', (data) => {
    id = data.id;
    users = data.players;
    Init();

    users.forEach(player => {
        addPlayer(player);
    });

});

let addPlayer = (data) => {
    const {player}  = data;
    users.push(data);
    game.addGameObject(new Rectangle(player.x, player.y, player.width, player.height, "", true));
};

socket.on('new player connected',(data) => {
    addPlayer(data);
});

socket.on('keyPress', ()=>{
    keyBoard();
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


let Init = () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  input = new Input(key);

  game = new Game(1200, 600, canvas, context);
  player = new Rectangle(Math.floor(Math.random() * 300), 100, 30, 30, "", true);


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



    socket.emit('keyPress', player);






    /*
    socket.emit('keyPress', data);
    */
};


