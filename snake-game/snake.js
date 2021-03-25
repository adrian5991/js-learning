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
  constructor(
    xPos = canvas.width / 2,
    yPos = canvas.height / 2,
    height = 0,
    width = 0,
    radius = 20
  ) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.height = height;
    this.width = width;
    this.radius = radius;
  }

  drawSnake(xPos, yPos) {
    ctx.beginPath();
    ctx.arc(xPos, yPos, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.drawSnake(this.xPos, this.yPos);
    if (right) {
      this.xPos += 10;
      if (this.xPos + this.width > canvas.width) {
        this.xPos = 0;
      }
    } else if (left) {
      this.xPos -= 10;
      if (this.xPos < 0) {
        this.xPos = canvas.width - this.width;
      }
    } else if (up) {
      this.yPos -= 10;
      if (this.yPos < 0) {
        this.yPos = canvas.height - this.height;
      }
    } else if (down) {
      this.yPos += 10;
      if (this.yPos + this.height > canvas.height) {
        this.yPos = 0;
      }
    }
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const mySnake = new Snake();
const myFood = Food(50, 50);

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
    bodyCount += 1;
    const newSnake = new Snake();
    bodyCountArray.push(bodyCount);
    snakes.push(newSnake);
  }
  // console.log(facingDir);
  if (facingDir === "east") {
    for (let i = 0; i < bodyCount; i++) {
      snakes[i].drawSnake(mySnake.xPos - mySnake.radius * 2 * bodyCountArray[i], mySnake.yPos);
    }
  } else if (facingDir === "west") {
    for (let i = 0; i < bodyCount; i++) {
      snakes[i].drawSnake(mySnake.xPos + mySnake.radius * 2 * bodyCountArray[i], mySnake.yPos);
    }
  } else if (facingDir === "north") {
    for (let i = 0; i < bodyCount; i++) {
      snakes[i].drawSnake(mySnake.xPos, mySnake.yPos - mySnake.radius * 2 * bodyCountArray[i]);
    }
  } else if (facingDir === "south") {
    for (let i = 0; i < bodyCount; i++) {
      snakes[i].drawSnake(mySnake.xPos, mySnake.yPos + mySnake.radius * 2 * bodyCountArray[i]);
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
