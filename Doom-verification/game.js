const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const verifyBtn = document.getElementById('verifyBtn');
const redirectURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

let player = { x: 400, y: 300, size: 20 };
let enemies = [];
let kills = 0;
let verified = false;

let playerSize = 20;
let player = {
  x: Math.min(canvas.width - playerSize, Math.max(0, 400)),
  y: Math.min(canvas.height - playerSize, Math.max(0, 300)),
  size: playerSize
};

function spawnEnemy() {
  enemies.push({
    x: Math.random() * (canvas.width - 20),
    y: Math.random() * (canvas.height - 20),
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
    if (
      e.alive &&
      Math.abs(player.x - e.x) < player.size &&
      Math.abs(player.y - e.y) < player.size
    ) {
      e.alive = false;
      kills++;
      updateVerifyStatus();
    }
  });
}

function updateVerifyStatus() {
  if (kills >= 3 && !verified) {
    verifyBtn.disabled = false;
    verifyBtn.classList.add('enabled');
    verifyBtn.style.cursor = 'pointer';
    verified = true;
  }
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

  // Clamp to canvas bounds
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
});

verifyBtn.addEventListener('click', () => {
  if (!verifyBtn.disabled) {
    window.location.href = redirectURL;
  }
});

gameLoop();

