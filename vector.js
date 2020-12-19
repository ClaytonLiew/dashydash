export default class vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new vector(this.x + v.x, this.y + v.y);
  }

  multiply(s) {
    return new vector(this.x * s, this.y * s);
  }

  normalize() {
    const m = Math.sqrt(this.x * this.x + this.y * this.y);
    return new vector(this.x / m || 0, this.y / m || 0);
  }
}
