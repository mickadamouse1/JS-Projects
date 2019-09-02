window.onload = function() {
  var txtTime = document.getElementById("txtTime");
  var txtTimerName = document.getElementById("txtTimerName");
  var windowBackground = document.getElementById("windowBackground");
  var background = document.body;
  var lap = 1;
  var audio = new Audio("audio/ding.wav");

  // FUNCTION that calculates which is the correct timer to run next. This is based on the laps which are incremented each time a timer is run.
  function runNextTimer(lap) {
    btnContinue.style.display = "block";
    if (lap % 8 === 0) {
      // RUN BIG BREAK
      console.log("Long Break");
      background.style.background = "rgb(68, 196, 94)";
      windowBackground.style.background = "url('images/backgroundGreen2.jpg') center/cover no-repeat";
      txtTimerName.innerHTML = "Long Break";
      txtTime.innerHTML = (`${longBreakTimer.minutes}:00`);
      btnContinue.onclick = function() {
        btnContinue.style.display = "none";
        longBreakTimer.countdown(lap);
      }
    } else if (lap % 2 == 0) {
      // RUN SHORT BREAK
      console.log("Short Break");
      background.style.background = "rgba(100, 200, 255)";
      windowBackground.style.background = "url('images/backgroundBlue.jpg') center/cover no-repeat";
      txtTimerName.innerHTML = "Short Break";
      txtTime.innerHTML = (`0${shortBreakTimer.minutes}:00`);
      btnContinue.onclick = function() {
        btnContinue.style.display = "none";
        shortBreakTimer.countdown(lap);
      }
    } else {
      // RUN STUDY
      console.log("Study");
      background.style.background = "rgba(255, 75, 40)";
      windowBackground.style.background = "url('images/backgroundRed.jpg') center/cover no-repeat";
      txtTimerName.innerHTML = "Study";
      txtTime.innerHTML = (`${studyTimer.minutes}:00`);
      btnContinue.onclick = function() {
        btnContinue.style.display = "none";
        studyTimer.countdown(lap);
      }
    }
  }

  function Timer(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.countdown = function(lap) {
      // increments the laps to ensure the next timer is the correct one.
      var lap = lap + 1;
      var minutes = this.minutes;
      var seconds = this.seconds;

      // displays the time on initiation
      txtTime.innerHTML = (`${minutes}:00`);
      var x = setInterval(function(){
        seconds--;
        if (seconds === -1) {
          seconds = 59
          minutes--;
        }

        // adds the 0 to the seconds and minutes to make the numbers display double digits.
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        if (minutes < 10) {
          txtTime.innerHTML = (`0${minutes}:${seconds}`);
        } else {
          txtTime.innerHTML = (`${minutes}:${seconds}`);
        }

        // the seconds is converted to a string therefore needs to be compared to a string
        if (minutes === 0 && seconds === "00") {
          audio.play();
          runNextTimer(lap);
          clearTimeout(x);
        }
      }, 0);
    }
  }

  var studyTimer = new Timer(25, 0);
  var shortBreakTimer = new Timer(5, 0);
  var longBreakTimer = new Timer (30, 0);

  runNextTimer(lap);
}
