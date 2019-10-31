window.onload = function() {

  ////////////////

  // Need to set global timer settings for each unique timer that has been set
  // the previous times were hard coded in, which prevents the changing of times.

  ///////////////////////////////////////////////////////////////////////////////

  // GLOBAL VARIABLES

  var txtTime = document.getElementById("txtTime");
  var txtTimerName = document.getElementById("txtTimerName");
  var btnStart = document.getElementById("btnStart");
  var btnPause = document.getElementById("btnPause");
  var btnApplySettings = document.getElementById("btnApplySettings");
  var windowBackground = document.getElementById("windowBackground");
  var background = document.body;
  var audio = new Audio("audio/ding.wav");
  var inputStudy = document.getElementById("inputStudy");
  var inputShortBreak = document.getElementById("inputShortBreak");
  var inputLongBreak = document.getElementById("inputLongBreak");

  var studyTime = 0;
  var shortBreakTime = 0;
  var longBreakTime = 0;

  ///////////////////////////////////////////////////////////////////////////////

  // Pre-loading background images.

  var redBackground = new Image();
  var greenBackground = new Image();
  var blueBackground = new Image();
  redBackground.src = "images/backgroundRed.jpg";
  greenBackground.src = "images/backgroundGreen.jpg";
  blueBackground.src = "images/backgroundBlue.jpg";

  ///////////////////////////////////////////////////////////////////////////////

  // Creates 3 new objects with different set time.

  var studyTimer = new Timer(25);
  var shortBreakTimer = new Timer(5);
  var longBreakTimer = new Timer (30);

  function createTimers(study, short, long) {
    studyTimer.minutes = study;
    shortBreakTimer.minutes = short;
    longBreakTimer.minutes = long;
    studyTime = study;
    shortBreakTime = short;
    longBreakTime = long;
    studyParams.txtTime = updateTimerText(studyTime, 0);
    shortBreakParams.txtTime = updateTimerText(shortBreakTime, 0);
    longBreakParams.txtTime = updateTimerText(longBreakTime, 0);
    txtTime.innerHTML = studyTimer.minutes + ":00"
  }

  ///////////////////////////////////////////////////////////////////////////////

  // These are the parameters used to update the graphics.
  // Each timer is given its own set of params.

  studyParams = {
    background: "rgba(255, 75, 40)",
    windowBackground: `url('${redBackground.src}') center/cover no-repeat`,
    txtTimerName: "Study",
    txtTime: `${studyTime}:00`,
    btnBackground: "firebrick"
  };

  shortBreakParams = {
    background: "rgba(100, 200, 255)",
    windowBackground:  `url('${blueBackground.src}') center/cover no-repeat`,
    txtTimerName: "Short Break",
    txtTime: `0${shortBreakTime}:00`,
    btnBackground: "cadetblue"
  };

  longBreakParams = {
    background: "rgb(68, 196, 94)",
    windowBackground:  `url('${greenBackground.src}') center/cover no-repeat`,
    txtTimerName: "Long Break",
    txtTime: `${longBreakTime}:00`,
    btnBackground: "cadetblue"
  }

  ///////////////////////////////////////////////////////////////////////////////

  // FUNCTION that calculates which is the correct timer to run next.
  // This is based on the laps which are incremented each time a timer is run.

  function runNextTimer(lap) {
    btnStart.style.display = "block";
    if (lap % 8 === 0) {
      longBreakTimer.minutes = longBreakTime;
      // updates the css properties to match the timer.
      updateGraphics(longBreakParams);
      btnStart.onclick = function() {
        btnStart.style.display = "none";
        longBreakTimer.countdown(lap);
      }
    } else if (lap % 2 == 0) {
      shortBreakTimer.minutes = shortBreakTime;
      updateGraphics(shortBreakParams);
      btnStart.onclick = function() {
        btnStart.style.display = "none";
        shortBreakTimer.countdown(lap);
      }
    } else {
      studyTimer.minutes = studyTime;
      updateGraphics(studyParams);
      btnStart.onclick = function() {
        btnStart.style.display = "none";
        studyTimer.countdown(lap);
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  // This is the timer constructor used to create the three different timers
  // it takes the argument of minutes to allow for the timers to display the
  // correct time on initiation.

  function Timer(minutes) {
    this.minutes = minutes;
    this.seconds = 0;
    this.storedMinutes = 0;
    this.storedSeconds = 0;
    this.countdown = function(lap) {

      var that = this;
      // increments the laps to ensure the next timer is the correct one.
      var lap = lap + 1;
      // enables pause button via style.display.
      setControlsDisplay("block", "none");

      // displays the time on initiation
      txtTime.innerHTML = updateTimerText(this.minutes, this.seconds);

      // This is the interval responsible for counting down.
      var x = setInterval(function(){
        that.seconds--;
        if (that.seconds === -1) {
          that.seconds = 59
          that.minutes--;
        }

        // assigns text to the value of the returned updateTimerText function.
        txtTime.innerHTML = updateTimerText(that.minutes, that.seconds);

        // When timer reaches 00:00 run next timer.
        if (that.minutes === 0 && that.seconds === 0) {
          setControlsDisplay("none", "none");
          audio.play();
          runNextTimer(lap);
          clearTimeout(x);
        }
      }, 1000);

      btnPause.onclick = function() {
        that.storedMinutes = that.minutes; // hypothetically 7
        that.storedSeconds = that.seconds; // hypothetically 55
        clearTimeout(x);
        // hides play button and displays continue button.
        setControlsDisplay("none", "block");
      }

      btnContinue.onclick = function () {
        that.minutes = that.storedMinutes; // set to 7
        that.seconds = that.storedSeconds; // set to 55
        // hides continue button and displays play button.
        setControlsDisplay("block", "none");
        // resets the lap increment to prevent double increments when the countdown function is ran again.
        lap = lap - 1;
        that.countdown(lap);
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  function updateTimerText(minutes, seconds) {

    // This function takes the minutes and seconds from the timers and
    // uses them to create valid text for the application user-interface.

    var txtMinutes = minutes;
    var txtSeconds = seconds;

    if (txtSeconds < 10) {
      txtSeconds = "0" + txtSeconds ;
    }

    if (txtMinutes < 10) {
      txtMinutes = "0" + txtMinutes;
    }

    return `${txtMinutes}:${txtSeconds}`
  }

  ///////////////////////////////////////////////////////////////////////////////

  function setControlsDisplay(pauseValue, continueValue) {
    btnPause.style.display = pauseValue;
    btnContinue.style.display = continueValue;
  }

  ///////////////////////////////////////////////////////////////////////////////

  // This function takes params from the params
  // objects and updates graphics accordingly
  // (param objs are located at line 15 - 26).

  function updateGraphics(params) {
    background.style.background = params.background;
    windowBackground.style.background = params.windowBackground;
    txtTimerName.innerHTML = params.txtTimerName;
    txtTime.innerHTML = params.txtTime;
    btnStart.style.background = params.btnBackground;
    btnPause.style.background = params.btnBackground;
    btnContinue.style.background = params.btnBackground;
  }

  ///////////////////////////////////////////////////////////////////////////////

  // runs the first timer with lap set to 1.
  // runNextTimer(1);

  runNextTimer(1);

  ///////////////////////////////////////////////////////////////////////////////
  // ######################################### //
  // ########### SETTINGS WINDOW ############# //
  // ######################################### //

  // Globals //

  function checkInputs () {
    var studyInput = inputStudy.value;
    var shortBreakInput = inputShortBreak.value;
    var longBreakInput = inputLongBreak.value;
    var arr = [studyInput, shortBreakInput, longBreakInput];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      x = x.replace(/[^0-9]/g, "");
      if (x.length < arr[i].length) arr[i] = "";
    }
    return arr;
  }

  btnApplySettings.onclick = function() {
    var inputs = checkInputs();
    if (inputs[0] == "" || inputs[1] == "" || inputs[2] == "") {
      alertWindow.style.display = "flex";
      alertWindow.style.width = "23rem";
      alertText.innerHTML = "Invalid Timers: Numbers Only.";
    } else if (inputs[0].length > 3 || inputs[1].length > 3 || inputs[2].length > 3) {
      alertWindow.style.display = "flex";
      alertWindow.style.display.width = "23rem";
      alertText.innerHTML = "Invalid Timers: Too Long.";
    } else {
      settingsContent.style.display = "none";
      timerContent.style.display = "flex";
      createTimers(inputs[0], inputs[1], inputs[2]);
    }
  }
}
