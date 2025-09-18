const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const verifyBtn = document.getElementById('verifyBtn');

let player = { x: 400, y: 300, size: 20 };
let enemies = [];
let kills = 0;

function spawnEnemy() {
  enemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 20,
    alive: true
  });
}

for (let i = 0; i < 3; i++) spawnEnemy();

function drawPlayer() {
  ctx.fillStyle = 'lime';
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawEnemies() {
  enemies.forEach(e => {
    if (e.alive) {
      ctx.fillStyle = 'red';
      ctx.fillRect(e.x, e.y, e.size, e.size);
    }
  });
}

function checkCollisions() {
  enemies.forEach(e => {
    if (e.alive &&
        Math.abs(player.x - e.x) < player.size &&
        Math.abs(player.y - e.y) < player.size) {
      e.alive = false;
      kills++;
      if (kills >= 3) verifyBtn.disabled = false;
    }
  });
}

function drawHUD() {
  ctx.fillStyle = 'white';
  ctx.font = '20px monospace';
  ctx.fillText(`Kills: ${kills}/3`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemies();
  drawHUD();
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  const speed = 10;
  if (e.key === 'ArrowUp') player.y -= speed;
  if (e.key === 'ArrowDown') player.y += speed;
  if (e.key === 'ArrowLeft') player.x -= speed;
  if (e.key === 'ArrowRight') player.x += speed;
});

verifyBtn.addEventListener('click', () => {
  alert('CAPTCHA complete. You are human.');
});

gameLoop();