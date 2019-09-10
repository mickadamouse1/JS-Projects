window.onload = function() {
  var txtTime = document.getElementById("txtTime");
  var txtTimerName = document.getElementById("txtTimerName");
  var btnStart = document.getElementById("btnStart");
  var btnPause = document.getElementById("btnPause");
  var windowBackground = document.getElementById("windowBackground");
  var background = document.body;
  var audio = new Audio("audio/ding.wav");

  // Pre-loading background images
  var redBackground = new Image();
  var greenBackground = new Image();
  var blueBackground = new Image();
  redBackground.src = "images/backgroundRed.jpg";
  greenBackground.src = "images/backgroundGreen.jpg";
  blueBackground.src = "images/backgroundBlue.jpg";

  var studyTimer = new Timer(25, 0);
  var shortBreakTimer = new Timer(5, 0);
  var longBreakTimer = new Timer (30, 0);

  studyParams = {
    background: "rgba(255, 75, 40)",
    windowBackground: `url('${redBackground.src}') center/cover no-repeat`,
    txtTimerName: "Study",
    txtTime: `${studyTimer.minutes}:00`
  };

  shortBreakParams = {
    background: "rgba(100, 200, 255)",
    windowBackground:  `url('${blueBackground.src}') center/cover no-repeat`,
    txtTimerName: "Short Break",
    txtTime: `0${shortBreakTimer.minutes}:00`
  };

  longBreakParams = {
    background: "rgb(68, 196, 94)",
    windowBackground:  `url('${greenBackground.src}') center/cover no-repeat`,
    txtTimerName: "Long Break",
    txtTime: `${longBreakTimer.minutes}:00`
  }

  function updateGraphics(params) {
    background.style.background = params.background;
    windowBackground.style.background = params.windowBackground;
    txtTimerName.innerHTML = params.txtTimerName;
    txtTime.innerHTML = params.txtTime;
  }

  // FUNCTION that calculates which is the correct timer to run next. This is based on the laps which are incremented each time a timer is run.
  function runNextTimer(lap) {
    btnStart.style.display = "block";
    if (lap % 8 === 0) {
      // Reset timer time
      longBreakTimer.minutes = 25;
      longBreakTimer.seconds = 0;
      // updates the css properties to match the timer
      updateGraphics(longBreakParams);
      // on start click, run this timer
      btnStart.onclick = function() {
        btnStart.style.display = "none";
        longBreakTimer.countdown(lap);
      }
    } else if (lap % 2 == 0) {
      // Reset timer time
      shortBreakTimer.minutes = 5;
      shortBreakTimer.seconds = 0;
      // updates the css properties to match the timer
      updateGraphics(shortBreakParams);
      // on start click, run this timer
      btnStart.onclick = function() {
        btnStart.style.display = "none";
        shortBreakTimer.countdown(lap);
      }
    } else {
      // Reset timer time
      studyTimer.minutes = 25;
      studyTimer.seconds = 0;
      // updates the css properties to match the timer
      updateGraphics(studyParams);
      // on start click, run this timer
      btnStart.onclick = function() {
        btnStart.style.display = "none";
        studyTimer.countdown(lap);
      }
    }
  }

  function Timer(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.storedMinutes = 0;
    this.storedSeconds = 0;
    this.countdown = function(lap) {

      // increments the laps to ensure the next timer is the correct one.
      var that = this;
      var lap = lap + 1;
      var minutes = this.minutes;
      var seconds = this.seconds;

      // enables pause button via style.display
      setControlsDisplay("block", "none");

      // displays the time on initiation
      var txtSeconds = seconds;
      var txtMinutes = minutes;

      if (txtSeconds < 10) {
        txtSeconds = txtSeconds + "0";
      }

      if (txtMinutes < 10) {
        txtMinutes = "0" + txtMinutes;
      }

      txtTime.innerHTML = (`${txtMinutes}:${txtSeconds}`);


      var x = setInterval(function(){
        seconds--;
        if (seconds === -1) {
          seconds = 59
          minutes--;
        }

        // adds the 0 to the seconds and minutes to make the numbers display double digits.
        if (seconds < 10) {
          txtSeconds = "0" + seconds;
        }

        if (minutes < 10) {
          txtMinutes = "0" + minutes;
        }

        txtTime.innerHTML = (`${txtMinutes}:${txtSeconds}`);
        
        // the seconds is converted to a string therefore needs to be compared to a string
        if (minutes === 0 && seconds === "00") {
          setControlsDisplay("none", "none");
          audio.play();
          //runs the next timer function which then runs the next timer
          runNextTimer(lap);
          // stops this setInterval loop
          clearTimeout(x);
        }
      }, 0);

      btnPause.onclick = function() {
        that.storedMinutes = minutes; // hypothetically 7
        that.storedSeconds = seconds; // hypothetically 55
        clearTimeout(x);
        // hides play button and displays continue button
        setControlsDisplay("none", "block");
      }

      btnContinue.onclick = function () {
        that.minutes = that.storedMinutes; // set to 7
        that.seconds = that.storedSeconds; // set to 55
        // hides continue button and displays play button
        setControlsDisplay("block", "none");
        // resets the lap increment to prevent double increments when the countdown function is ran again.
        lap = lap - 1;
        that.countdown(lap);
      }
    }
  }

function setControlsDisplay(pauseValue, continueValue) {
  btnPause.style.display = pauseValue;
  btnContinue.style.display = continueValue;
}

  // runs the first timer with lap set to 1.
  runNextTimer(1);
}
