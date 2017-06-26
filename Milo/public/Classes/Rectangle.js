class Rectangle extends Object {
  constructor(x, y, width, height, color, filled) {
    super(x, y, width, height, color);
    //this.context = context;
    this.filled = filled || false;
  }

  start() {

  }

  update() {

  }

  draw(context) {
    if (this.filled) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    } else {
      context.rect(this.x, this.y, this.width, this.height);
      context.stroke();
    }

  }

}
