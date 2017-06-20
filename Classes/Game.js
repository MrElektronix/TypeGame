class Game {
  constructor(sceneWidth, sceneHeight, canvas, context) {
    this.gameObjects = [];
    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
    this.canvas = canvas;
    this.context = context;

    this.start();
  }

  stayInGameScreen() {

  }

  start() {
    this.canvas.width = this.sceneWidth;
    this.canvas.height = this.sceneHeight;
  }

  update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i].draw) {
        this.gameObjects[i].draw(this.context);
      }
    }
  }


  addGameObject(obj) {
    this.gameObjects.push(obj);
  }
}
