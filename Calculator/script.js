/////////////////////////////////////////////////////////////////////

// SESSION NOTES

// Adding single digits works. However, it doesnt allow us to add double digits.
// We need to store digits and operate on "=" rather than operating when a number is clicked.
// Good luck!

/////////////////////////////////////////////////////////////////////

// Creates global variables

var outputScreen = document.getElementById("outputScreen");
var btnDivide = document.getElementById("btnDivide");
var btnMultiply = document.getElementById("btnMultiply");
var btnMinus = document.getElementById("btnMinus");
var btnPlus = document.getElementById("btnPlus");
var btnEquals = document.getElementById("btnEquals");
var btnDecimal = document.getElementById("btnDecimal");
var btnClear = document.getElementById("btnClear");

/////////////////////////////////////////////////////////////////////

// Array that stores all buttons and a for loop that creates objects using each button

var btnNumArr = [btnNum0, btnNum1, btnNum2, btnNum3, btnNum4, btnNum5, btnNum6, btnNum7, btnNum8, btnNum9];
var btnNumObjs = [];

// this creates unique objects with a different Number each object is
// able to refer to a number-button based on the number it was given

for (var i = 0; i < btnNumArr.length; i++) {
  btnNumArr[i] = document.getElementById("btnNum" + i);
  btnNumObjs[i] = new ButtonNum(i);
  btnNumObjs[i].include();
}

/////////////////////////////////////////////////////////////////////

// these are used to help the computer understand what to do with
// the next number that is input into the system

var adding = false;
var subtracting = false;
var multiplying = false;
var dividing = false;

function updateOperationStatus(add, sub, mult, div) {
  adding = add;
  subtracting = sub;
  multiplying = mult;
  dividing = div;
}

/////////////////////////////////////////////////////////////////////

// This array contains all opperands
// this array is cleared whenever the clear button is clicked

var operands = [];

/////////////////////////////////////////////////////////////////////

// C O N S T R U C T O R for creating the number button objects
// (doesnt include operator buttons)

function ButtonNum(num) {
  this.num = num;
  this.include = function() {
    var that = this;
    btnNumArr[this.num].onclick = function() {
      outputScreen.value = outputScreen.value + that.num;
      adjustTextSize();

      if (adding) {
        add();
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////

// Function that adjusts the text size of the textarea value
// this ensures that the text doesnt overflow and appear buggy

function adjustTextSize() {
  if (outputScreen.value.length > 11) {
    outputScreen.style.fontSize = "3rem";
  }

  if (outputScreen.value.length > 14) {
    outputScreen.style.fontSize = "2rem";
  }

  if (outputScreen.value.length > 44) {
    outputScreen.value = "Number too large. \nClear to continue.";
    disableAllButtons(true);
  }
}

/////////////////////////////////////////////////////////////////////

// Function that disables or enables all number buttons
// true disables, false enables

function disableAllButtons(value) {
  for (var i = 0; i < btnNumArr.length; i++) {
    btnNumArr[i].disabled = value;
  }
}

/////////////////////////////////////////////////////////////////////

function operate(operator) {

}

/////////////////////////////////////////////////////////////////////

function add() {
  var stored;
  operands.push(Number(outputScreen.value));
  stored = operands[0] + operands[1];
  outputScreen.value = stored;
  operands = [];
  operands.push()
}

/////////////////////////////////////////////////////////////////////

// on click, clear the output screen and re-enable all buttons if they're disabled

btnClear.onclick = function() {
  outputScreen.value = "";
  outputScreen.style.fontSize = "4rem";
  if (btnNum0.disabled === true) disableAllButtons(false);
  operands = [];
}

/////////////////////////////////////////////////////////////////////

// on click, add a decimal number to the screen

btnDecimal.onclick = function() {
  outputScreen.value = outputScreen.value + ".";
}

/////////////////////////////////////////////////////////////////////

// on click, push outputScreen number to the operands array
// (located at the top of file)

btnPlus.onclick = function() {
  if (outputScreen.value != "") {
    updateOperationStatus(true, false, false, false);
    operands.push(Number(outputScreen.value));
    outputScreen.value = "";
    console.log(operands);
  }
}




/////////////////////////////////////////////////////////////////////

// on click, run


/////////////////////////////////////////////////////////////////////
