const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let right = false;
let left = false;
let up = false;
let down = false;
let bodyCount = 0;
let bodyCountArray = [];
let snakes = [];
let facingDir = "east";

document.addEventListener("keydown", (e) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    right = true;
    facingDir = "east";
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    left = true;
    facingDir = "west";
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    up = true;
    facingDir = "north";
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    down = true;
    facingDir = "south";
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    right = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    left = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    up = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    down = false;
  }
});
