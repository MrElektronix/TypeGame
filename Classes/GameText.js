class GameText {
  constructor(canvas, context) {
    this.context = context;
  }

  Text(message) {
    this.context.beginPath();
    this.context.font = "30px Arial";
    this.context.fillText(message || " ", (canvas.width / 2) - 80, canvas.height - 100);
  }



}
