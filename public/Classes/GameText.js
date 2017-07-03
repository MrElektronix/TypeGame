class GameText {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
  }

  Text(message) {
    this.context.font = "30px Arial";
    this.context.fillText(message || " ", ((this.canvas.width / 2) - 80), (this.canvas.height - 100));
  };



}
