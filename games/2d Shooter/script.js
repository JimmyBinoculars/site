const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const playerSize = 20;
const playerSpeed = 5;
const bulletSpeed = 7;
const enemySpeed = 3;
const maxEnemies = 5;
let playerX = canvas.width / 2 - playerSize / 2;
let playerY = canvas.height / 2 - playerSize / 2;
let playerColor = '#3498db';
let bullets = [];
let enemies = [];
let obstacles = generateObstacles();
let score = 0;
function generateObstacles() {
  const obstacles = [];
  const numObstacles = 10;
  for (let i = 0; i < numObstacles; i++) {
    obstacles.push({
      x: Math.random() * (canvas.width - playerSize),
      y: Math.random() * (canvas.height - playerSize),
      width: playerSize * (Math.random() * 2 + 1),
      height: playerSize * (Math.random() * 2 + 1),
    });
  }
  return obstacles;
}
function drawObstacles() {
  ctx.fillStyle = '#7f8c8d';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}
function drawPlayer() {
  ctx.fillStyle = playerColor;
  ctx.fillRect(playerX, playerY, playerSize, playerSize);
}
function drawBullet(bullet) {
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(bullet.x, bullet.y, 5, 10);
}
function drawEnemy(enemy) {
  ctx.fillStyle = '#2ecc71';
  ctx.fillRect(enemy.x, enemy.y, playerSize, playerSize);
}
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = '#333';
  ctx.fillText('Score: ' + score, 10, 30);
}
function drawGun() {
  const angle = Math.atan2(mouseY - (playerY + playerSize / 2), mouseX - (playerX + playerSize / 2));
  ctx.save();
  ctx.translate(playerX + playerSize / 2, playerY + playerSize / 2);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(playerSize, 0);
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();
}
function update() {
  // Move player
  if (leftPressed && playerX > 0) {
    playerX -= playerSpeed;
  }
  if (rightPressed && playerX < canvas.width - playerSize) {
    playerX += playerSpeed;
  }
  if (upPressed && playerY > 0) {
    playerY -= playerSpeed;
  }
  if (downPressed && playerY < canvas.height - playerSize) {
    playerY += playerSpeed;
  }
  // Move bullets
  bullets = bullets.filter(bullet => {
    bullet.x += Math.cos(bullet.angle) * bulletSpeed;
    bullet.y += Math.sin(bullet.angle) * bulletSpeed;
    return bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.height;
  });
  // Move enemies
  enemies.forEach(enemy => {
    const angle = Math.atan2(playerY - enemy.y, playerX - enemy.x);
    enemy.x += Math.cos(angle) * enemySpeed;
    enemy.y += Math.sin(angle) * enemySpeed;
    // Check for collisions with bullets
    bullets.forEach(bullet => {
      if (
        bullet.x < enemy.x + playerSize &&
        bullet.x + 5 > enemy.x &&
        bullet.y < enemy.y + playerSize &&
        bullet.y + 10 > enemy.y
      ) {
        // Remove bullet and enemy on collision
        score++;
        bullets = bullets.filter(b => b !== bullet);
        enemies = enemies.filter(e => e !== enemy);
      }
    });
    // Check for collisions with player
    if (
      playerX < enemy.x + playerSize &&
      playerX + playerSize > enemy.x &&
      playerY < enemy.y + playerSize &&
      playerY + playerSize > enemy.y
    ) {
      // Game over
      alert('Game Over! Your Score: ' + score);
      resetGame();
    }
  });
  // Add new enemies
  if (Math.random() < 0.02 && enemies.length < maxEnemies) {
    enemies.push({
      x: Math.random() * (canvas.width - playerSize),
      y: Math.random() * (canvas.height - playerSize),
    });
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawObstacles();
  drawPlayer();
  bullets.forEach(drawBullet);
  enemies.forEach(drawEnemy);
  drawGun();
  drawScore();
}
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}
function resetGame() {
  playerX = canvas.width / 2 - playerSize / 2;
  playerY = canvas.height / 2 - playerSize / 2;
  bullets = [];
  enemies = [];
  obstacles = generateObstacles();
  score = 0;
}
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
document.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    leftPressed = true;
  } else if (e.key === 'd') {
    rightPressed = true;
  } else if (e.key === 'w') {
    upPressed = true;
  } else if (e.key === 's') {
    downPressed = true;
  }
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'a') {
    leftPressed = false;
  } else if (e.key === 'd') {
    rightPressed = false;
  } else if (e.key === 'w') {
    upPressed = false;
  } else if (e.key === 's') {
    downPressed = false;
  }
});
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
document.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});
document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {  // Left mouse button
    bullets.push({
      x: playerX + playerSize / 2,
      y: playerY + playerSize / 2,
      angle: Math.atan2(mouseY - (playerY + playerSize / 2), mouseX - (playerX + playerSize / 2)),
    });
  }
});
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  resetGame();
});
gameLoop();