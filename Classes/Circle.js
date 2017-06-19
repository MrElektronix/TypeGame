class Circle extends Object {
  constructor(x, y, radius, color, filled) {
    super(x, y, color);
    this.radius = radius;
    this.filled = filled || false;
  }

  start() {

  }

  update() {

  }

  draw(context) {
    if (this.filled) {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    } else {
      context.beginPath();
      context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
      context.closePath();
      context.stroke();
    }

  }

}
