var socket = io();
var user;

var setUsername = () => {
  socket.emit('setUsername', document.getElementById('name').value);
}

socket.on('userExists', (data) => {
  document.getElementById('error-container').innerHTML = data.username;
});

socket.on('userSet', (data) => {
  user = data.username;
  document.body.innerHTML = '<canvas id="canvas"></canvas>\
           <input id="textbox" type="text" name="typebox" placeholder="text" autofocus="">\
             <input type="submit" value="Submit" style="visibility:hidden;">';
  Init();
})





var textbox;
var input;
var buttonPushed;
var Words, randomWord;
var h, t, i;
var game, player, playerSpeed, typeGame, gameText;
var canvas, context;

key = [];

document.addEventListener("keydown", function(e) {
  key[e.keyCode] = true;
  if (buttonPushed == 3) {
    buttonPushed = 1;
  }
});

document.addEventListener("keyup", function(e) {
  delete key[e.keyCode];
  buttonPushed = 3;
});



var Init = () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  playerSpeed = 0;

  textbox = document.getElementById("textbox");
  input = new Input(key);

  game = new Game(1200, 600, canvas, context);
  player = new Rectangle(30, 30, 30, 30, "", true);
  typeGame = new TypeGame();
  gameText = new GameText(canvas, context);
  console.log(canvas.width);
  game.addGameObject(player);

  DisplayWord();
  animate();
}


function animate() {
  requestAnimationFrame(animate);
  Keyboard();
  CheckLetters();

  game.update();
  moveForward(player, playerSpeed);

  gameText.Text(Words[randomWord]);
}

function moveForward(obj, speed) {
  obj.x += speed;
}


function Keyboard() {
  if (input.onKeyDown("enter")) {
    if (buttonPushed == 1) {
      CheckWord();
      buttonPushed = 2;
    }
  } else {
    console.log("not enter");
  }
}

function CheckLetters() {
  let i = 0;
  let j = 1;
  let substring = textbox.value.substr(i, j);
  let substring2 = Words[randomWord].substr(i, j)

  if (substring == substring2) {
    console.log("word in word");

  } else {

  }
}


function DisplayWord() {
  Words = ["hello", "apple", "orange", "peer", "world", "book", "shelf"];
  randomWord = Math.floor(Math.random() * Words.length);
  gameText.Text(Words[randomWord]);
}

function CheckWord() {
  if (typeGame.checkWord(textbox, Words[randomWord])) {
    DisplayWord();
    textbox.value = "";
    playerSpeed += player.addSpeed(1);
  } else {
    textbox.value = "";
  }
}