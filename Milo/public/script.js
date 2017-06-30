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


socket.on('displayingWord', (data) => {
    gameText.Text(data);
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

            moveForward(obj.player.x);
        }

    }
});


let input;
let game, player, typeGame, gameText, textbox;
let canvas, context;
let buttonPushed;
let Words, randomWord, newWord;


key = [];

document.addEventListener("keydown", (e) => {
  key[e.keyCode] = true;

  if(buttonPushed === 3) buttonPushed = 1;

});

document.addEventListener("keyup", (e) => {
  delete key[e.keyCode];
  buttonPushed = 3;
});


let Init = (data) => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  textbox = document.getElementById("textbox");
  input = new Input(key);

  game = new Game(1200, 600, canvas, context);
  player = new Rectangle(data.id, Math.floor(Math.random() * 300), 100, 30, 30, "", true);
  typeGame = new TypeGame();
  gameText = new GameText(canvas, context);

  socket.emit("makePlayer", {
    id: id,
    player: player,
  });

  DisplayWord();
  animate();
};


let animate = () => {
  requestAnimationFrame(animate);
  moveForward();
  KeyBoard();

  game.update();
  gameText.Text(newWord);
};

let KeyBoard = () => {
    if (input.onKeyDown("enter")) {
        if (buttonPushed === 1) {
            CheckWord();
        }
        buttonPushed = 2;
    }
};

let DisplayWord = () => {
    Words = ["hello", "apple", "orange", "peer", "world", "book", "shelf"];
    randomWord = Math.floor(Math.random() * Words.length);
    newWord = Words[randomWord];

    gameText.Text(newWord);

    moveForward();
    socket.emit("word", {
        word: newWord,
    });

};

let CheckWord = () =>{
    if (typeGame.checkWord(textbox, newWord)) {
        DisplayWord();

        typeGame.clearTextField(textbox);
    } else {
        typeGame.clearTextField(textbox);
    }
};



let moveForward = () => {
    player.x += 5;

    socket.emit('moving', {
        id: id,
        player: player
    });
};



