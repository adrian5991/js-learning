/*
  - more js practice
  - using browser date object is more accurate than incrementing via any js function
  - beginner flexbox
*/

const timer = document.querySelector("#timer");
const startStopButton = document.querySelector("#startStop");
const resetButton = document.querySelector("#reset");
timer.innerHTML = `00:00:00`;
let intervalId = null;
const stopWatch = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

startStopButton.addEventListener("click", start);

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  timer.innerHTML = `00:00:00`;
  stopWatch.seconds = 0;
  stopWatch.minutes = 0;
  stopWatch.hours = 0;
  startStopButton.classList.remove("active-button");
  startStopButton.innerHTML = "Start";
});

function start() {
  const now = Date.now();
  const offset = stopWatch.seconds;
  intervalId = setInterval(() => updateTimer(now, offset), 1000);
  startStopButton.removeEventListener("click", start);
  startStopButton.addEventListener("click", stop);
  startStopButton.innerHTML = "Stop";
  startStopButton.classList.add("active-button");
}

function stop() {
  clearInterval(intervalId);
  startStopButton.removeEventListener("click", stop);
  startStopButton.addEventListener("click", start);
  startStopButton.innerHTML = "Start";
  startStopButton.classList.remove("active-button");
}

function updateTimer(start, offset) {
  let delta = Date.now() - start;
  let elapsed = Math.floor(delta / 1000) + offset;
  stopWatch.seconds = elapsed;
  if (elapsed > 59) {
    if (elapsed % 60 === 0) {
      stopWatch.minutes++;
    }
    stopWatch.seconds = resetSeconds(elapsed, stopWatch.minutes);
    if (stopWatch.minutes % 60 === 0) {
      stopWatch.minutes = 0;
      stopWatch.hours++;
    }
  }

  const hh = addZero(stopWatch.hours);
  const mm = addZero(stopWatch.minutes);
  const ss = addZero(stopWatch.seconds);
  timer.innerHTML = `${hh}:${mm}:${ss}`;
  return stopWatch;
}

function addZero(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

function resetSeconds(num, minutes) {
  return num - 60 * minutes;
}
