var textbox;
var input;
var buttonPushed;
var Words, randomWord;
var h, t, i;
var game, player, playerSpeed;
var canvas, context;

function Init() {
  playerSpeed = 0;
  canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');

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

  textbox = document.getElementById("textbox");
  input = new Input(key);

  game = new Game(1200, 600, canvas, context);
  player = new Rectangle(30, 30, 30, 30, "", true);

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
    h.style.color = "red";
  } else {
    h.style.color = "black";
  }
}


function DisplayWord() {
  Words = ["hello", "apple", "orange", "peer", "world", "book", "shelf"];
  randomWord = Math.floor(Math.random() * Words.length);
  h = document.createElement("H1");
  t = document.createTextNode(Words[randomWord]);
  h.appendChild(t);
  document.body.appendChild(h);
  h.style.position = "absolute";
  h.style.left = "45%";
  h.style.top = "75%";
  h.style.fontSize = "40px";
}

function CheckWord() {
  let speed = 0.25;
  if (textbox.value == Words[randomWord]) {
    document.body.removeChild(h);
    DisplayWord();
    textbox.value = "";
    playerSpeed += speed;
  } else {
    textbox.value = "";
  }
}

Init();
