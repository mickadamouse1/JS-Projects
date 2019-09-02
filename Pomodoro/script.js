window.onload = function() {
  var txtTime = document.getElementById("txtTime");
  var background = document.getElementById("background");
  var lap = 1;

  // FUNCTION that calculates which is the correct timer to run next. This is based on the laps which are incremented each time a timer is run.
  function runNextTimer(lap) {
    if (lap % 8 === 0) {
      // RUN BIG BREAK
      console.log("Long Break");
      background.style.background = "url('images/backgroundGreen2.jpg') center/cover no-repeat";
      timerLongBreak(lap);
    } else if (lap % 2 == 0) {
      // RUN SHORT BREAK
      console.log("Short Break");
      background.style.background = "url('images/backgroundBlue.jpg') center/cover no-repeat";
      timerShortBreak(lap);
    } else {
      // RUN STUDY
      console.log("Study");
      background.style.background = "url('images/backgroundRed.jpg') center/cover no-repeat";
      timerStudy(lap);
    }
  }

  /////////////////////////////////////////////////////////

  function timerStudy(lap) {
    // increments the laps to ensure the next timer is the correct one.
    var lap = lap + 1;
    var minutes = 2;
    var seconds = 0;
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
        runNextTimer(lap);
        clearTimeout(x);
      }
    }, 0);
  }

  /////////////////////////////////////////////////////////

  function timerShortBreak(lap) {
    // increments the laps to ensure the next timer is the correct one.
    var lap = lap + 1;
    var minutes = 2;
    var seconds = 0;
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
        // runs the function which calculates the next timer to be ran and then runs it.
        runNextTimer(lap);
        // ends this interval.
        clearTimeout(x);
      }
    }, 0);
  }

  /////////////////////////////////////////////////////////

  function timerLongBreak(lap) {
    console.log(lap);
    var lap = 1;
    var minutes = 5;
    var seconds = 0;

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
        runNextTimer(lap);
        clearTimeout(x);
      }
    }, 100);
  }

  /////////////////////////////////////////////////////////


  timerStudy(lap);
}
