import { canvas, ctx, size } from "./constants.js";
import vector from "./vector.js";

const player = {
  pos: new vector(canvas.width / 2 - size / 2, canvas.height / 2 - size / 2),
  vel: new vector(0, 0),
  w: size,
  h: size,
  keys: {},
  canBoost: true,
  isBoosting: false,
  update(deltaTime) {
    this.pos = this.pos.add(this.vel.multiply(deltaTime));
    this.vel = this.vel.multiply(0.9).normalize();

  	if (this.keys["KeyW"] || this.keys["ArrowUp"]) this.vel.y -= size * 5;
    if (this.keys["KeyS"] || this.keys["ArrowDown"]) this.vel.y += size * 5;
    if (this.keys["KeyA"] || this.keys["ArrowLeft"]) this.vel.x -= size * 5;
    if (this.keys["KeyD"] || this.keys["ArrowRight"]) this.vel.x += size * 5;

    if (this.keys["Space"] && this.canBoost) {
      this.canBoost = false;
      this.isBoosting = true;
      setTimeout(() => (this.canBoost = true), 5000);
      setTimeout(() => (this.isBoosting = false), 1000);
    }

    if (this.isBoosting) this.vel = this.vel.multiply(2.5);

    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = 0;
    } else if (this.pos.x + this.w > canvas.width) {
      this.pos.x = canvas.width - this.w;
      this.vel.x = 0;
    }

    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = 0;
    } else if (this.pos.y + this.h > canvas.height) {
      this.pos.y = canvas.height - this.h;
      this.vel.y = 0;
    }

    this.render();
  },
  render() {
    ctx.fillStyle = this.isBoosting ? "cyan" : this.canBoost ? "orange" : "red";
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
  },
};

export default player;
