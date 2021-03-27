const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
const playButton = document.querySelector("#playButton");

playButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  play();
  playButton.style.visibility = "hidden";
});

let dy = 0;
let dx = 20;
const objectWidth = 20;
const objectHeight = 20;

// prevent from moving in opposite direction
document.addEventListener("keydown", (e) => {
  if ((e.key == "Right" || e.key == "ArrowRight") && dx === 0) {
    dy = 0;
    dx = 20;
  } else if ((e.key == "Left" || e.key == "ArrowLeft") && dx === 0) {
    dx = -20;
    dy = 0;
  } else if ((e.key == "Up" || e.key == "ArrowUp") && dy === 0) {
    dx = 0;
    dy = -20;
  } else if ((e.key == "Down" || e.key == "ArrowDown") && dy === 0) {
    dx = 0;
    dy = 20;
  }
});

function Food(height, width) {
  let food = Object.create(Food.prototype);
  food.xPos = food.randomize(50, canvas.width - 50);
  food.yPos = food.randomize(50, canvas.height - 50);
  food.height = height;
  food.width = width;
  return food;
}

Food.prototype.draw = function () {
  ctx.beginPath();
  ctx.rect(this.xPos, this.yPos, this.width, this.height);
  ctx.fillStyle = "#d475fc";
  ctx.fill();
  ctx.closePath();
};

Food.prototype.randomize = function (min, max) {
  return Math.round((Math.random() * (max - min) + min) / 20) * 20;
};

class Snake {
  constructor(width, height) {
    this.snakeBody = [
      { x: 300, y: 400 },
      { x: 280, y: 400 },
      { x: 260, y: 400 },
      { x: 240, y: 400 },
    ];
    this.height = height;
    this.width = width;
    this.length = 4;
  }

  draw() {
    for (let i = 0; i < this.snakeBody.length; i++) {
      ctx.beginPath();
      ctx.rect(this.snakeBody[i].x, this.snakeBody[i].y, this.height, this.width);
      ctx.fillStyle = "#f27f0a";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }

  move() {
    const head = { x: this.snakeBody[0].x + dx, y: this.snakeBody[0].y + dy };
    this.snakeBody.unshift(head);
    this.snakeBody.pop();
  }
}

const mySnake = new Snake(objectHeight, objectWidth);
const myFood = Food(objectHeight, objectWidth);

function score(x) {
  let newScore = (x - 4) * 10;
  ctx.font = "35px Pangolin";
  ctx.lineWidth = 1;
  ctx.fillText(newScore, 10, 35);
  const prevScore = localStorage.getItem("snakeScore");
  if (!prevScore) {
    ctx.fillText(0, 560, 35);
  }
  ctx.fillText(localStorage.getItem("snakeScore"), 560, 35);
  return newScore;
}

function gameover(id) {
  alert("Game over!");
  document.location.reload();
  clearInterval(id);
  localStorage.setItem("snakeScore", score(mySnake.length));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myFood.draw();
  mySnake.draw();
  mySnake.move();
  const snakeHead = mySnake.snakeBody[0];
  // eat the food
  if (snakeHead.x == myFood.xPos && snakeHead.y == myFood.yPos) {
    myFood.xPos = myFood.randomize(50, canvas.width - 50);
    myFood.yPos = myFood.randomize(50, canvas.height - 50);
    mySnake.snakeBody.push({
      x: mySnake.snakeBody[mySnake.length - 1].x,
      y: mySnake.snakeBody[mySnake.length - 1].y,
    });
    mySnake.length++;
  }

  score(mySnake.length);

  // check for border collision
  if (snakeHead.x > canvas.width - 20) {
    // snakeHead.x = 0;
    gameover(id);
  } else if (snakeHead.x < 0) {
    // snakeHead.x = canvas.width;
    gameover(id);
  } else if (snakeHead.y < 0) {
    // snakeHead.y = canvas.height;
    gameover(id);
  } else if (snakeHead.y > canvas.height - 20) {
    // snakeHead.y = 0;
    gameover(id);
  }
  // check for collision with itself
  for (let i = 1; i < mySnake.length; i++) {
    if (snakeHead.x === mySnake.snakeBody[i].x && snakeHead.y === mySnake.snakeBody[i].y) {
      gameover(id);
    }
  }
}

function play() {
  window.id = setInterval(animate, 75);
}
