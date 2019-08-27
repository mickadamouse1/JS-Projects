var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var x = 150;
var y = 151;
var dx = 2;
var dy = -2;

var ballRadius = 18;


function drawBall1() {
  c.beginPath();
  c.arc(x, y, ballRadius, 0, Math.PI * 2, true);
  c.fillStyle = "#888";
  c.fill();
  c.closePath();
}

function draw() {
  c.clearRect(0, 0, 750, 600);
  drawBall1();
  // drawBall2();
  if (x + dx > (canvas.width - ballRadius)) {
    dx = -2;
  }

  if (x + dx < ballRadius) {
    dx = 2;
  }

  if (y + dy > (canvas.height - ballRadius)) {
    dy = -2;
  }

  if (y + dy < ballRadius) {
    dy = 2;
  }
  x += dx;
  y += dy;
}

setInterval(draw, 0);
