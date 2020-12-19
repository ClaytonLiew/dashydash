import { ctx, size } from "./constants.js";
import vector from "./vector.js";

export default class enemy {
  constructor(x, y) {
    this.pos = new vector(x, y);
    this.vel = new vector(0, 0);
    this.w = size;
    this.h = size;
  }

  update(deltaTime, player) {
    const dx = this.pos.x - player.pos.x;
    const dy = this.pos.y - player.pos.y;

    this.vel = this.vel.add(
      new vector(-dx, -dy).normalize().multiply(size * 2)
    );

    this.pos = this.pos.add(this.vel.multiply(deltaTime));
    this.vel = this.vel.multiply(0.9).normalize();

    this.render();
  }

  render() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
  }
}

const clamp = (min, num, max) => (num > max ? max : num < min ? min : num);
