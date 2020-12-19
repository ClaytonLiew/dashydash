import { canvas, ctx, enemies, size } from "./constants.js";
import enemy from "./enemy.js";
import player from "./player.js";
import vector from "./vector.js";

ctx.font = "96px monospace";
ctx.fillStyle = "yellow";
ctx.textAlign = "center";
ctx.fillText("click to start", canvas.width / 2, canvas.height / 2);

document.addEventListener("click", start);
document.addEventListener("keydown", start);

function start() {
  document.removeEventListener("click", start);
  document.removeEventListener("keydown", start);

  document.addEventListener("keydown", function (e) {
    player.keys[e.code] = true;
  });

  document.addEventListener("keyup", function (e) {
    delete player.keys[e.code];
  });

  let lastTime = 0;
  let deltaTime = 0;

  let gameOver = false;

  let pts = 0;

  function animate(ms) {
    const time = ms / 1000;
    deltaTime = time - lastTime;
    lastTime = time;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update(deltaTime);

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText(pts, player.pos.x + size / 2, player.pos.y + size / 2 + 6);

    enemies.forEach((e, i) => {
      e.update(deltaTime, player);

      if (
        e.pos.x + e.w > player.pos.x &&
        e.pos.x < player.pos.x + player.w &&
        e.pos.y + e.h > player.pos.y &&
        e.pos.y < player.pos.y + player.h
      ) {
        if (player.isBoosting) {
          enemies.splice(i, 1);
          pts++;
        } else {
          gameOver = true;
          ctx.font = "96px monospace";
          ctx.fillStyle = "lightgreen";
          ctx.fillText("game over", canvas.width / 2, canvas.height / 2);
          setTimeout(() => location.reload(), 1000);
        }
      }

      enemies.forEach((b) => {
        if (e === b) return;

        if (
          e.pos.x + e.w > b.pos.x &&
          e.pos.x < b.pos.x + b.w &&
          e.pos.y + e.h > b.pos.y &&
          e.pos.y < b.pos.y + b.h
        ) {
          const dx = e.pos.x - b.pos.x;
          const dy = e.pos.y - b.pos.y;

          e.vel = e.vel.add(new vector(dx, dy).normalize().multiply(size));
          b.vel = b.vel.add(new vector(-dx, -dy).normalize().multiply(size));
        }
      });
    });

    if (!gameOver) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  let interval = 2000;

  function spawn() {
    let x = Math.floor(Math.random() * (canvas.width - size));
    let y = Math.floor(Math.random() * (canvas.height - size));
    while (
      Math.sqrt(Math.pow(x - player.pos.x, 2) + Math.pow(y - player.pos.y, 2)) <
      size * 5
    ) {
      x = Math.floor(Math.random() * (canvas.width - size));
      y = Math.floor(Math.random() * (canvas.height - size));
    }
    enemies.push(new enemy(x, y));
    if (interval > 100) interval -= 10;
    setTimeout(spawn, interval);
  }

  setTimeout(spawn, interval);
}
