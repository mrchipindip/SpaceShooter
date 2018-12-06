var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var currentLevel = 1;
var calledOrNot = 1;

//pddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var lives = 3;
//Move bools
var rightPressed = false;
var leftPressed = false;
//Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 40;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//brick array
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  //C's
  bricks[c] = [];
  for (var r = 0; r < brickColumnCount; r++) {
    //R's
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1,
      moving: 0,
      dx: Math.random(3, -3),
      dy: Math.random(3, -3)
    }; //pos
  }
}
//Bullets
bulletCount = 10;
var bullets = [];
for (var b = 0; b < bulletCount; b++) {
  bullets[b] = { x: 0, y: 0, firing: 0 };
}
//UFO BUllets
ufoBulletCount = 15;
var ufoBullets = [];
for (var b = 0; b < ufoBulletCount; b++) {
  ufoBullets[b] = { x: 0, y: 0, firing: 0, status: 1 };
}
//BOSS BULLETS
bossBulletCount = 30;
var bossBullets = [];
for (var b = 0; b < bossBulletCount; b++) {
  bossBullets[b] = { x: 0, y: 0, firing: 0, status: 1 };
}

var score = 0;

var boss = {
  x: 150,
  y: 40,
  status: 1,
  dx: 1.5,
  health: 30,
  state: 1
};

function drawPaddle() {
  var img = document.getElementById("ship");
  ctx.drawImage(img, paddleX, canvas.height - 35, 40, 35);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawBackground() {
  var img = document.getElementById("bg");
  ctx.drawImage(img, 0, 0, 650, 500);
}

function drawBoss() {
  if (boss.x + boss.dx < 10 || boss.x + boss.dx > canvas.width - 200) {
    boss.dx = -boss.dx;
  }
  boss.x += boss.dx;

  var img = document.getElementById("bossImg");
  ctx.drawImage(img, boss.x, boss.y, 200, 75);
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    //C's
    for (var r = 0; r < brickRowCount; r++) {
      //R's
      if (bricks[c][r].status == 1) {
        if (bricks[c][r].moving == 0) {
          var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
        } else {
          if (
            //edges
            bricks[c][r].x + bricks[c][r].dx < 10 ||
            bricks[c][r].x + bricks[c][r].dx > canvas.width
          ) {
            bricks[c][r].dx = -bricks[c][r].dx;
          } else if (
            bricks[c][r].y + bricks[c][r].dy < 10 ||
            bricks[c][r].y + bricks[c][r].dx > canvas.width / 2
          ) {
            bricks[c][r].dy = -bricks[c][r].dy;
          }

          bricks[c][r].x += bricks[c][r].dx;
          bricks[c][r].y += bricks[c][r].dy;

          var brickX = bricks[c][r].x;
          var brickY = bricks[c][r].y;
        }

        var img = document.getElementById("ufo");
        ctx.drawImage(img, brickX, brickY, 40, 35);

        // ctx.beginPath();
        // ctx.rect(brickX, brickY, brickWidth, brickHeight);
        // ctx.fillStyle = "#000000";
        // ctx.fill();
        // ctx.closePath();
      }
    }
  }
  for (var c = 0; c < brickColumnCount; c++) {
    //C's
    for (var r = 0; r < brickRowCount; r++) {
      //R's
      bricks[c][r].moving = 1;
    }
  }
}

function drawBullet() {
  for (var b = 0; b < bulletCount; b++) {
    if (bullets[b].firing != 0) {
      bullets[b].y -= 4;
    } else {
      bullets[b].x = paddleX + paddleWidth / 4;
      bullets[b].y = canvas.height - paddleHeight;
    }
    ctx.beginPath();
    ctx.rect(bullets[b].x, bullets[b].y, 4, 10);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    //resets
    if (bullets[b].y < -10) {
      bullets[b].firing = 0;
    }
  }
}

function drawBossBullet() {
  for (var b = 0; b < bossBulletCount; b++) {
    if (bossBullets[b].firing != 0) {
      //if its firing do the move
      bossBullets[b].y += 4;
    } else {
      if (b % 2 == 0) {
        //Split the bullets evenly so that they are on both sides of the ship
        bossBullets[b].x = boss.x + 20;
        bossBullets[b].y = boss.y + 38;
      } else {
        bossBullets[b].x = boss.x + 180;
        bossBullets[b].y = boss.y + 38;
      }
    }

    ctx.beginPath();
    ctx.rect(bossBullets[b].x, bossBullets[b].y, 4, 10);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();

    //resets
    if (bossBullets[b].y > 500) {
      bossBullets[b].firing = 0;
    }
  }
}

function drawUfoBullet() {
  for (var b = 0; b < ufoBulletCount; b++) {
    var i = 0;
    var j = 0;

    if (b < 5) {
      i = b;
    } else if (b < 10) {
      j = 1;
      i = b - 5;
    } else {
      j = 2;
      i = b - 10;
    }

    if (ufoBullets[b].firing == 0) {
      if (bricks[i][j].status == 0) {
        ufoBullets[b].status = 0;
        ufoBullets[b].x = -10;
        ufoBullets[b].y = 0;
      } else {
        ufoBullets[b].x = bricks[i][j].x + 18;
        ufoBullets[b].y = bricks[i][j].y + 10;
      }
    } else {
      ufoBullets[b].y += 3;
    }

    if (ufoBullets[b].status != 0) {
      ctx.beginPath();
      ctx.rect(ufoBullets[b].x, ufoBullets[b].y, 4, 10);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.closePath();
    } else {
    }

    //resets
    if (ufoBullets[b].y > 510) {
      ufoBullets[b].firing = 0;
    }
  }
}

var interval;

function bossBehaviour() {
  var count = 0;
  for (var i = 0; i < bossBulletCount; i++) {
    if (bossBullets[i].firing == 0) {
      bossBullets[i].firing = 1;
      count++;
      if (count == 2) {
        i = 100;
      }
    }
  }

  if (calledOrNot == 1) {
    interval = setInterval(bossBehaviour, 500);
    calledOrNot = 2;
  }
}

function shootUfoBullet() {
  var bulNum = Math.floor(Math.random() * 15);
  if (ufoBullets[bulNum].firing == 0) {
    ufoBullets[bulNum].firing = 1;
  }
}

function shoot() {
  for (var b = 0; b < bulletCount; b++) {
    if (bullets[b].firing == 0) {
      bullets[b].firing = 1; //not finished
      b = 20;
    }
  } //
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  //levelOne();
  //drawBall();
  levelTwo();
  drawBullet();
  drawPaddle();
  drawScore();
  drawLives();

  collisionDetection();

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  requestAnimationFrame(draw);
}

function levelOne() {
  drawBricks();
  drawUfoBullet();
}
function levelTwo() {
  drawBoss();
  drawBossBullet();
  if (boss.state == 1) {
    bossBehaviour();
    boss.state = 2;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 32) {
    shoot();
    //shootUfoBullet();
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        for (var bul = 0; bul < bulletCount; bul++) {
          if (
            bullets[bul].x > b.x &&
            bullets[bul].x < b.x + brickWidth &&
            bullets[bul].y > b.y &&
            bullets[bul].y < b.y + brickHeight
          ) {
            //dy = -dy;
            bullets[bul].firing = 0;
            b.status = 0;
            score++;
            if (score == brickRowCount * brickColumnCount) {
              alert("YOU WIN");
              document.location.reload();
            }
          }
        }
      }
    }
  }
  for (var ufoBNum = 0; ufoBNum < ufoBulletCount; ufoBNum++) {
    if (
      ufoBullets[ufoBNum].x > paddleX &&
      ufoBullets[ufoBNum].x < paddleX + paddleWidth / 4 &&
      ufoBullets[ufoBNum].y > 465 &&
      ufoBullets[ufoBNum].y < 500
    ) {
      if (lives == 0) {
        alert("GameOver");
      }
      lives--;
      ufoBullets[ufoBNum].firing = 0;
    }
  }
}
draw();

setInterval(shootUfoBullet, 3000);

//setInterval(draw, 10);
