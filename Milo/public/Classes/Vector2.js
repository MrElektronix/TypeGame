class Vector2 {
  constructor(dx, dy) {
    this.dx = dx || 0;
    this.dy = dy || 0;
  }

  magnitude() {
    return Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
  }

  angle() {
    return Math.atan2(this.dy, this.dx);
  }

  scalarMultiplication(scalar) {
    let ans = new Vector2(scalar * this.dx, scalar * this.dy);
    return ans;
  }

  normalized() {
    this.dx = this.dx / this.magnitude();
    this.dy = this.dy / this.magnitude();
  }

  add(vector) {
    let ans = new Vector2(this.dx + vector.x, this.dy + vector.y);
    return ans;
  }

  substract(vector) {
    let ans = new Vector2(this.dx - vector.x, this.dy - vector.y);
    return ans;
  }

  distance(vector1, vector2) {
    let a = vector1.x + vector1.y;
    let b = vector2.x + vector2.y;
    let c = a - b;
    return Math.abs(c);
  }

  distanceX(vector1, vector2) {
    let ans = vector1.x - vector2.x;
    return ans;

  }

  distanceY(vector1, vector2) {
    let ans = vector1.y - vector2.y;
    return ans;
  }

  absDistanceX(vector1, vector2) {
    let a = vector1.x + vector1.x;
    let b = vector2.x + vector2.x;
    let c = a - b;
    return Math.abs(c);
  }

  absDistanceY(vector1, vector2) {
    let a = vector1.y + vector1.y;
    let b = vector2.y + vector2.y;
    let c = a - b;
    return Math.abs(c);
  }


}
