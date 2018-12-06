//var canvas = document.getElementById("myCanvas");
//var ctx = canvas.getContext("2d");
//ctx.fillStyle = "#FF0000";
//ctx.fillRect(0, 0, 600, 600);

//var ctz = canvas.getContext("2d");
//ctz.fillStyle = "#000000";
//ctz.fillRect(265, 4, 70, 20);

//var ctz = canvas.getContext("2d");
////ctz.fillStyle = "#000000";
//ctz.fillRect(265, 5, 70, 20);
//ctz.beginPath();

//ctz.arc(95, 50, 40, 0, 2 * Math.PI);
//ctz.stroke();
var myGamePiece;
var thrusting = false;

function startGame() {
  myGamePiece = new component(20, 40, "red", 10, 165);
  myGamePiece2 = new component(20, 40, "red", 690, 165);
  //myBall = new component(5, 5, "black", 360, 175);
  myBall = new component(5, 5, "black", 360, 175);

  myGameArea.start();
}

//KEY LISTENER for pressed
window.onkeydown = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (key == 38) {
    moveUp();
  } else if (key == 40) {
    moveDown();
  } else if (key == 39) {
    moveRight();
  } else if (key == 37) {
    moveLeft();
  } else if (key == 13) {
    TimeToL();
  }
};

window.onkeyup = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (key == 38) {
    //moveDown();
    myGamePiece.speedY = 0;
    thrusting = false;
  } else if (key == 40) {
    //// moveUp();
    myGamePiece.speedY = 0;
  } else if (key == 39) {
    //moveLeft();
    myGamePiece.speedX = 0;
  } else if (key == 37) {
    //moveRight();
    myGamePiece.speedX = 0;
  } else if (key == 13) {
  }
};

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 720;
    this.canvas.height = 350;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.thrust.x = 0;
  this.thrust.y = 0;
  this.speed = 0;
  this.angle = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    // ctx = myGameArea.context;

    // ctx.fillStyle = color;

    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.restore;
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  };
  this.newPos = function() {
    //this.x += this.speedX;
    if (thrusting) {
      this.thrust.x += 5 * Math.cos(this.angle);
      this.thrust.y -= 5 * Math.sin(this.angle);
    }

    this.x += this.thrust.x;
    this.y += this.thrust.y;
    //this.x += this.speed * Math.sin(this.angle);
    //this.y -= this.speed * Math.cos(this.angle);
    // if (this.speedY < 0 && this.y > 10) {
    //   this.y += this.speedY;
    // } else if (this.speedY > 0 && this.y < 310) {
    //   this.y += this.speedY; //
    // }
  };
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos();
  //myGamePiece.angle += (1 * Math.PI) / 180;
  myGamePiece.update();
  //myGamePiece2.newPos();
  //myGamePiece2.update();
  //myBall.newPos();
  //myBall.update();
  //checkCollision();
}

function checkCollision() {
  if (checkCol(myBall, myGamePiece) == true) {
    TimeToR();
  } else if (checkCol(myBall, myGamePiece2)) {
    TimeToL();
  }
}

function checkCol(ball, paddle) {
  if (
    ball.x >= paddle.x &&
    ball.x <= paddle.x + 20 &&
    (ball.y >= paddle.y && ball.x <= paddle.x + 40)
  ) {
    if (ball.x > 350) {
      //
      TimeToL();
    } else {
      TimeToR(); //
    }
  }
}

function moveUp() {
  if (myGamePiece.speedY != -1) {
    // myGamePiece.speedY -= 1;
    ////myGamePiece.speed += 1;
    // thrusting = true;
  }
}

function moveDown() {
  if (myGamePiece.speedY != 1) {
    myGamePiece.speedY += 1;
  }
}

function TimeToL() {
  if (myBall.speedX != -1) {
    myBall.speedX -= 1;
  }
}

function TimeToR() {
  if (myBall.speedX != 1) {
    myBall.speedX += 1;
  }
}

function moveLeft() {
  if (myGamePiece.speedX != -1) {
    // myGamePiece.speedX -= 1;
    myGamePiece.angle += (-4 * Math.PI) / 180;
  }
}

function moveRight() {
  if (myGamePiece.speedX != 1) {
    //myGamePiece.speedX += 1;
    myGamePiece.angle += (4 * Math.PI) / 180;
  }
}
