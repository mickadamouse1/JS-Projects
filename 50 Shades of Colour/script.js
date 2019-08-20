window.onload = function() {
  var canvas = document.getElementById("canvas"); // assigns the canvas element to the variable "canvas"
  var inptRed = document.getElementById("inptRed"); // inpt = input
  var inptGreen = document.getElementById("inptGreen");
  var title = document.getElementById("title");
  draw();
}

var colourPallet = {
  red: 255,
  green: 255,
  blue: 255
}

function draw() {
  var ctx = canvas.getContext("2d");

  for (var i = 0; i < 50; i++) {
    ctx.fillStyle = `rgb(${newColour(colourPallet.red, (i * 2))}, ${newColour(colourPallet.green, (i * 2))}, ${newColour(colourPallet.blue, (i * 2))})`;
    ctx.fillRect(0, (i * 12), 1200, 12);
  }

  title.style.color = `rgb(${colourPallet.red}, ${colourPallet.green}, ${colourPallet.blue})`
}

function newColour(colour, percentage) {
  var x = Math.floor((colour * percentage) / 100);
  console.log(x);
  return colour - x;
}

inptRed.oninput = function() {
  if (inptRed.value === "") {
    colourPallet.red = 255;
  } else {
    colourPallet.red = inptRed.value;
  }
  draw();
};

inptGreen.oninput = function() {
  if (inptGreen.value === "") {
    colourPallet.green = 255;
  } else {
    colourPallet.green = inptGreen.value;
  }
  draw();
};

inptBlue.oninput = function() {
  if (inptBlue.value === "") {
    colourPallet.blue = 255;
  } else {
    colourPallet.blue = inptBlue.value;
  }
  draw();
};
