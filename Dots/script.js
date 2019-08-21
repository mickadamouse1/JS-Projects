var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight + 2;

var c = canvas.getContext("2d");

for (var i = 0; i < 200; i++) {
  var colours = ["C44536", "EDDDD4", "772E25", "197278", "283D3B"];
  var radius = Math.random() * 40;
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.fillStyle = "#" + colours[Math.floor(Math.random() * colours.length)];
  c.fill();
}
