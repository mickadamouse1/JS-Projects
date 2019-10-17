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

// This loop assigns each btn ID to a variable that corresponds with its name.
// It then assigns each of these variables with an object (via constructor).
// The object constructor is passed the button number that allows it to have
// an onclick event that responds based on the number given.

for (var i = 0; i < btnNumArr.length; i++) {
  btnNumArr[i] = document.getElementById("btnNum" + i);
  btnNumObjs[i] = new ButtonNum(i);
  btnNumObjs[i].include();
}

/////////////////////////////////////////////////////////////////////

// These variables act as a que for what operation will come next.
// If "adding" is true, then the next operator/equals pressed will add the numbers.

var adding = false;
var subtracting = false;
var multiplying = false;
var dividing = false;

// This function is for quick-assignment of the que.

function updateOperationStatus(add, sub, mult, div) {
  adding = add;
  subtracting = sub;
  multiplying = mult;
  dividing = div;
}

/////////////////////////////////////////////////////////////////////

// This "storedNum" variable is where the number to be operated on will be stored.
// "startNewCalc", when true, allows number buttons to clear the output window for fresh calculations.
// (This only applies when a calculation has been completed. It bypasses the need to clear the window manually via the "clear" button).

var storedNum = 0;
var startNewCalc = false;

/////////////////////////////////////////////////////////////////////

// This is the constructor for creating the calcuator's number buttons.
// It assigns a onclick event to each button that adds the button to the output window.
// These numbers can be added to eachother to create larger numbers before finally being operated on.

function ButtonNum(num) {
  this.num = num;
  this.include = function() {
    var that = this;
    btnNumArr[this.num].onclick = function() {
      disableOperators(false);
      if (startNewCalc) {
        outputScreen.value = "";
        startNewCalc = false;
      }
      outputScreen.value = outputScreen.value + that.num;
      adjustTextSize();
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

// This function is used to perform operations on the stored number.
// The qued operation determines which of these operations will be ran.

function operate() {
  if (adding) {
    outputScreen.value = Number(storedNum) + Number(outputScreen.value);
  } else if (subtracting) {
    outputScreen.value = storedNum - Number(outputScreen.value);
  } else if (multiplying) {
    outputScreen.value = storedNum * Number(outputScreen.value);
  } else if (dividing) {
    outputScreen.value = storedNum / Number(outputScreen.value);
  }
}

/////////////////////////////////////////////////////////////////////

// This is used to disable or enable all operator buttons.

function disableOperators(value) {
  btnEquals.disabled = value;
  btnPlus.disabled = value;
  btnMinus.disabled = value;
  btnDivide.disabled = value;
  btnMultiply.disabled = value;
}

/////////////////////////////////////////////////////////////////////

// When "btnClear" is clicked, clear the output screen and re-enable all buttons if they're disabled.

btnClear.onclick = function() {
  outputScreen.value = "";
  outputScreen.style.fontSize = "4rem";
  if (btnNum0.disabled === true) disableAllButtons(false);
  storedNum = 0;
}

/////////////////////////////////////////////////////////////////////

// On click, add a decimal to the output outputScreen number if it isn't empty.

btnDecimal.onclick = function() {
  if (outputScreen.value) outputScreen.value = outputScreen.value + ".";
}

/////////////////////////////////////////////////////////////////////

// Whenever an operator button is clicked it checks to see if the storedNum is empty.
// If so, it updates the storedNum by assigning it to the output screen value.
// It then clears the output screen for further inputs.

// If the storedNum is not empty, then the operator will perform an operation based on which operator it is.
// It will then assign the stored number to the new operation value.
// The "startNewCalc" variable will be set to "true" to allow inputs to clear output screen for the next operations.
// Finally, the operation que will be set to its corresponding operator (adding, subtracting, multiplying, dividing).
// When an operation is about to be performed this que is checked, and whichever is true determines which operation will be carried out.

btnPlus.onclick = function() {
  disableOperators(true);
  if (storedNum !== 0) {
    operate();
    storedNum = outputScreen.value;
    startNewCalc = true;
    updateOperationStatus(true, false, false, false);
  } else {
    updateOperationStatus(true, false, false, false);
    storedNum = outputScreen.value;
    outputScreen.value = "";
  }
}

/////////////////////////////////////////////////////////////////////

btnMinus.onclick = function() {
  disableOperators(true);
  if (storedNum !== 0) {
    operate();
    storedNum = outputScreen.value;
    startNewCalc = true;
    updateOperationStatus(false, true, false, false);
  } else {
    updateOperationStatus(false, true, false, false);
    storedNum = outputScreen.value;
    outputScreen.value = "";
  }
}

/////////////////////////////////////////////////////////////////////

btnMultiply.onclick = function() {
  disableOperators(true);
  if (storedNum !== 0) {
    operate();
    storedNum = outputScreen.value;
    startNewCalc = true;
    updateOperationStatus(false, false, true, false);
  } else {
    updateOperationStatus(false, false, true, false);
    storedNum = outputScreen.value;
    outputScreen.value = "";
  }
}

/////////////////////////////////////////////////////////////////////

btnDivide.onclick = function() {
  disableOperators(true);
  if (storedNum !== 0) {
    operate();
    storedNum = outputScreen.value;
    startNewCalc = true;
    updateOperationStatus(false, false, false, true);
  } else {
    updateOperationStatus(false, false, false, true);
    storedNum = outputScreen.value;
    outputScreen.value = "";
  }
}

/////////////////////////////////////////////////////////////////////

btnEquals.onclick = function() {
  if (outputScreen.value) {
    if (storedNum) {
      operate();
      startNewCalc = true;
      updateOperationStatus(false, false, false, false);
    }
  }
}

/////////////////////////////////////////////////////////////////////
