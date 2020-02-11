var txtGuesses = document.getElementById("txtGuesses");
var txtHits = document.getElementById("txtHits");
var txtOutput = document.getElementById("txtOutput");
var btnRestart = document.getElementById("btnRestart");

var guesses = 20;
var hits = 0;
var gameFinished = false;

var arrCells = [];
for (var i = 0; i < 64; i++) { // generates cells
  arrCells[i] = i + 1;
}
console.log(arrCells);

window.onload = init();

function init(){
  var cells = document.getElementsByClassName("txtCell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = checkHit;
  }
}

var ship1 = {
  assignLoc: function() {
    this.loc1 = generateHorizPos();
    this.loc2 = this.loc1 + 1;
  }
};

var ship2 = {
  assignLoc: function() {
    this.loc1 = arrCells[Math.floor(Math.random() * 56)];
    this.loc2 = this.loc1 + 8;
    adjustPos();
  }
};

function generateHorizPos() {
  var a = Math.floor(Math.random() * 7) + 1; // generates a postion for horizontal ships to ensure they dont exceed cell limit
  var b = a + 8;
  var c = b + 8;
  var d = c + 8;
  var e = d + 8;
  var f = e + 8;
  var g = f + 8;
  var h = g + 8;
  var arr = [a, b, c, d, e, f, g, h];
  return arr[Math.floor(Math.random() * 8)];
}

function adjustPos() {
  if (ship2.loc1 == ship1.loc1 || ship2.loc1 == ship1.loc2 || ship2.loc2 == ship1.loc1 || ship2.loc2 == ship1.loc2) { // adjust the postion of ships if they overlap
    ship2.loc1 = ship1.loc2 + 1;
    ship2.loc2 = ship2.loc1 + 8;
    console.log("moved");
    if (ship2.loc1 > 54) {
      ship2.loc1 = ship1.loc1 - 9;
      ship2.loc2 = ship2.loc1 + 8;
    }
  }
}

function restartGame() {
  guesses = 20;
  hits = 0;
  gameFinished = false;
  txtOutput.innerHTML = "...";
  for (var i = 1; i <= arrCells.length; i++) {
    var cell;
    if (i < 9) {
      cell = "a" + i;
    } else if (i < 17) {
      cell = "b" + (i - 8);
    } else if (i < 25) {
      cell = "c" + (i - 16);
    } else if (i < 33) {
      cell = "d" + (i - 24);
    } else if (i < 41) {
      cell = "e" + (i - 32);
    } else if (i < 49) {
      cell = "f" + (i - 40);
    } else if (i < 57) {
      cell = "g" + (i - 48);
    } else if (i <= 64) {
      cell = "h" + (i - 56);
    }
    document.getElementById(cell.toString()).classList.remove("miss");
    document.getElementById(cell.toString()).classList.remove("hit");
    document.getElementById(cell.toString()).innerHTML = cell;
    txtGuesses.innerHTML = "20";
    txtHits.innerHTML = "0"
    ship1.assignLoc();
    ship2.assignLoc();
  }
}

function checkHit(e) {
  var target = e.currentTarget; // assigns target equal to the Event Object target property
  var targetId = target.id; // assigns the target id to its own variable for later use in the for loop.
  var id = document.getElementById(targetId); // assigns a variable named "id" with the id of the targeted cell
  var cells = document.getElementsByClassName("txtCell"); // used for counting through the for loop (could be replaced).
  for (var i = 1; i < cells.length; i++) { // A for loop used for translating the cell id into a cell number between 1 & 64.
    if (cells[i] == id) {
      var cell = i + 1;
    }
    if (cell == undefined) {
      cell = 1;
    }
  }
  if (gameFinished) { // if the gameFinished variable is false, then the game wont be playable.
    console.log("The game is already over");
    return;
  };

  if (id.innerHTML === "Hit" || id.innerHTML === "Miss"){
    console.log("You already attacked there!!!");
  } else {
    if (cell == ship1.loc1 || cell == ship1.loc2 || cell == ship2.loc1 || cell == ship2.loc2) {
      console.log("hit");
      id.classList.add("hit");
      id.innerHTML = "Hit";
      hits++
      guesses--
      txtOutput.innerHTML = "Hit!";
    } else {
      console.log("Attacked cell " + cell + " and missed");
      id.classList.add("miss");
      id.innerHTML = "Miss";
      guesses--
      txtOutput.innerHTML = "Miss!";
    }
    txtGuesses.innerHTML = guesses;
    txtHits.innerHTML = hits;
  }

  if (hits === 4) {
    txtOutput.innerHTML = "You Win!"
    gameFinished = true;
  } else if (guesses === 0) {
    txtOutput.innerHTML = "You Lose!";
    gameFinished = true;
  }
}

ship1.assignLoc();
ship2.assignLoc();

console.log(ship1.loc1, ship1.loc2);
console.log(ship2.loc1, ship2.loc2);

btnRestart.onclick = function() {
  restartGame();
};
