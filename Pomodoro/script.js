window.onload = function() {
  var txtTime = document.getElementById("txtTime");
  var background = document.getElementById("background");
  var lap = 1;
  var audio = new Audio("audio/ding.wav");

  // FUNCTION that calculates which is the correct timer to run next. This is based on the laps which are incremented each time a timer is run.
  function runNextTimer(lap) {
    btnContinue.style.display = "block";
    if (lap % 8 === 0) {
      // RUN BIG BREAK
      console.log("Long Break");
      background.style.background = "url('images/backgroundGreen2.jpg') center/cover no-repeat";
      txtTime.innerHTML = (`${longBreakTimer.minutes}:00`);
      btnContinue.onclick = function() {
        btnContinue.style.display = "none";
        longBreakTimer.countdown(lap);
      }
    } else if (lap % 2 == 0) {
      // RUN SHORT BREAK
      console.log("Short Break");
      background.style.background = "url('images/backgroundBlue.jpg') center/cover no-repeat";
      txtTime.innerHTML = (`0${shortBreakTimer.minutes}:00`);
      btnContinue.onclick = function() {
        btnContinue.style.display = "none";
        shortBreakTimer.countdown(lap);
      }
    } else {
      // RUN STUDY
      console.log("Study");
      background.style.background = "url('images/backgroundRed.jpg') center/cover no-repeat";
      txtTime.innerHTML = (`${studyTimer.minutes}:00`);
      btnContinue.onclick = function() {
        btnContinue.style.display = "none";
        studyTimer.countdown(lap);
      }
    }
  }

  /////////////////////////////////////////////////////////

  var studyTimer = {
    minutes: 25,
    seconds: 0,
    countdown: function(lap) {
      // increments the laps to ensure the next timer is the correct one.
      var lap = lap + 1;
      var minutes = this.minutes;
      var seconds = this.seconds;
      // displays the time on initiation
      txtTime.innerHTML = (`${minutes}:${seconds}0`);
      var x = setInterval(function(){
        seconds--;
        if (seconds === -1) {
          seconds = 59
          minutes--;
        }

        // adds the 0 to make the numbers display double digits.
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        if (minutes < 10) {
          txtTime.innerHTML = (`0${minutes}:${seconds}`);
        } else {
          txtTime.innerHTML = (`${minutes}:${seconds}`);
        }

        if (minutes === 0 && seconds === "00") {
          audio.play();
          runNextTimer(lap);
          clearTimeout(x);
        }
      }, 0);
    }
  }

  /////////////////////////////////////////////////////////

  var shortBreakTimer = {
    minutes: 5,
    seconds: 0,
    countdown: function(lap) {
      // increments the laps to ensure the next timer is the correct one.
      var lap = lap + 1;
      var minutes = this.minutes;
      var seconds = this.seconds;

      // displays the time on initiation.
      txtTime.innerHTML = (`0${minutes}:${seconds}0`);

      var x = setInterval(function(){
        seconds--;
        if (seconds === -1) {
          seconds = 59;
          minutes--;
        }

        // adds the 0 to make the numbers display double digits.
        if (seconds < 10) {
          txtTime.innerHTML = (`0${minutes}:0${seconds}`);
        } else {
          txtTime.innerHTML = (`0${minutes}:${seconds}`);
        }

        // when both seconds and minutes reach 00, the next timer will be run.
        if (minutes === 0 && seconds === 0) {
          audio.play();
          // runs the function which calculates the next timer to be ran and then runs it.
          runNextTimer(lap);
          // ends this interval.
          clearTimeout(x);
        }
      }, 0);
    }
  }

  /////////////////////////////////////////////////////////

  var longBreakTimer = {
    minutes: 5,
    seconds: 0,
    countdown: function(lap) {
      var lap = lap + 1;
      var seconds = this.seconds;
      var minutes = this.minutes;

      var x = setInterval(function(){
        seconds--;
        if (seconds === -1) {
          seconds = 59;
          minutes--;
        }

        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        if (minutes < 10) {
          txtTime.innerHTML = `0${minutes}:${seconds}`;
        } else {
          txtTime.innerHTML = `${minutes}:${seconds}`
        }


        if (minutes === 0 && seconds === "00") {
          audio.play();
          runNextTimer(lap);
          clearTimeout(x);
        }
      }, 0);
    }
  }

  /////////////////////////////////////////////////////////


  runNextTimer(lap);
}
