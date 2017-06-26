var socket;

function setup(){
createCanvas(200,200);
background(51);

socket = socket.io.connect('https://localhost:3000');
}
function draw(){
  noStroke();
  fill();
  ellipse(mouseX, mouseY, 36, 36);
  console.log("hallo?");
}
console.log("skosjfs")
