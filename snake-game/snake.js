const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let right = false;
let left = false;
let up = false;
let down = false;

document.addEventListener("keydown", (e) => {
  if (e.key == "Right" || e.key == "ArrowRight") {
    right = true;
    mySnake.move(right);
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    left = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    up = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    down = true;
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

function Food(height, width) {
  let food = Object.create(Food.prototype);
  food.xPos = getRandomIntInclusive(500, canvas.width);
  food.yPos = getRandomIntInclusive(500, canvas.height);
  food.height = height;
  food.width = width;
  return food;
}

Food.prototype.drawFood = function () {
  ctx.beginPath();
  ctx.rect(this.xPos, this.yPos, this.width, this.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

Food.prototype.draw = function () {
  this.drawFood();
};

class Snake {
  constructor(xPos, yPos, height, width, radius) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.height = height;
    this.width = width;
    this.radius = radius;
  }

  drawSnake() {
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.drawSnake();
    if (right) {
      this.xPos += 10;
      if (this.xPos + this.width > canvas.width) {
        this.xPos = canvas.width - this.width;
      }
    } else if (left) {
      this.xPos -= 10;
      if (this.xPos < 0) {
        this.xPos = 0;
      }
    } else if (up) {
      this.yPos -= 10;
      if (this.yPos < 0) {
        this.yPos = 0;
      }
    } else if (down) {
      this.yPos += 10;
      if (this.yPos + this.height > canvas.height) {
        this.yPos = canvas.height - this.height;
      }
    }
  }
}

const mySnake = new Snake(canvas.width / 2, canvas.height / 2, 50, 50, 20);
const myFood = Food(50, 50);
let score = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mySnake.move();
  myFood.draw();
  if (
    mySnake.xPos > myFood.xPos &&
    mySnake.xPos < myFood.xPos + myFood.width &&
    mySnake.yPos > myFood.yPos &&
    mySnake.yPos < myFood.yPos + myFood.height
  ) {
    myFood.xPos = getRandomIntInclusive(500, canvas.width - 500);
    myFood.yPos = getRandomIntInclusive(500, canvas.height - 500);
    score += 10;
    console.clear();
    console.log(score);
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
