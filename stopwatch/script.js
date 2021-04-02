const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const timer = document.querySelector("#timer");
const stopButton = document.querySelector("#stop");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
timer.innerHTML = `00:00:00`;

const stopWatch = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
});

startButton.addEventListener("click", () => {
  const start = Date.now();
  const offset = stopWatch.seconds;
  intervalId = setInterval(() => updateTimer(start, offset), 1000);
});

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  timer.innerHTML = `00:00:00`;
  stopWatch.seconds = 0;
  stopWatch.minutes = 0;
  stopWatch.hours = 0;
});

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
