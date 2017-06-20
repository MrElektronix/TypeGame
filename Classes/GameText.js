class GameText {
  constructor(context) {
    this.context = context;
  }

  Text(message) {
    this.context.beginPath();
    this.context.font = "30px Arial";
    this.context.fillText(message || " ", 100, 100);
  }



}
