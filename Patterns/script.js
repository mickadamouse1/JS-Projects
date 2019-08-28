var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var ball1 = {
  x: 40,
  y: 40,
  dx: 10,
  dy: -10,
  radius: 5,
  colour: "red"
};


function drawBalls(ball) {
  c.beginPath();
  c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
  c.fillStyle = ball.colour;
  c.fill();
  c.closePath();
}

function draw() {
  // c.clearRect(0, 0, 750, 600);
  drawBalls(ball1);
  moveBall(ball1);

  function moveBall(ball) {
    if (ball.x + ball.dx > (canvas.width - ball.radius)) {
      ball.dx = -10;
    }

    if (ball.x + ball1.dx < ball1.radius) {
      ball.dx = 10;
    }

    if (ball.y + ball1.dy > (canvas.height - ball1.radius)) {
      ball.dy = -10;
    }

    if (ball.y + ball.dy < ball.radius) {
      ball.dy = 10;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
  }
}

setInterval(draw, 0);
