const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 🔒 Lock canvas size in JS to match visual size
canvas.width = 400;
canvas.height = 300;

const playerSize = 30;
const inchOffset = 30; // ~1 inch left of center

let player = {
  x: canvas.width / 2 - playerSize / 2 - inchOffset,
  y: canvas.height / 2 - playerSize / 2,
  size: playerSize,
  color: 'lime'
};

let enemies = [];
let kills = 0;
const requiredKills = 3;

function spawnEnemy() {
  enemies.push({
    x: Math.random() * (canvas.width - playerSize),
    y: Math.random() * (canvas.height - playerSize),
    size: playerSize,
    color: 'red'
  });
}

for (let i = 0; i < requiredKills; i++) spawnEnemy();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Draw enemies
  enemies.forEach(enemy => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  });

  // Draw HUD
  ctx.fillStyle = '#202124';
  ctx.font = '16px Roboto';
  ctx.fillText(`Kills: ${kills}/${requiredKills}`, 10, 25);
}

function checkCollision(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

function update() {
  enemies = enemies.filter(enemy => {
    if (checkCollision(player, enemy)) {
      kills++;
      return false;
    }
    return true;
  });

  if (kills >= requiredKills) {
    const btn = document.getElementById('verifyBtn');
    btn.disabled = false;
    btn.classList.add('enabled');
    btn.style.cursor = 'pointer';
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  const speed = 10;
  if (e.key === 'ArrowUp') player.y -= speed;
  if (e.key === 'ArrowDown') player.y += speed;
  if (e.key === 'ArrowLeft') player.x -= speed;
  if (e.key === 'ArrowRight') player.x += speed;

  // Clamp to canvas bounds
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
});

const redirectURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

document.getElementById('verifyBtn').addEventListener('click', () => {
  if (!document.getElementById('verifyBtn').disabled) {
    window.location.href = redirectURL;
  }
});

gameLoop();
