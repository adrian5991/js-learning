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

class Snake {
  constructor(xPos, yPos, height, width) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.height = height;
    this.width = width;
  }
  drawSnake() {
    ctx.beginPath();
    ctx.rect(this.xPos, this.yPos, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    requestAnimationFrame(() => this.draw());
  }
}

const mySnake = new Snake(canvas.width / 2, canvas.height / 2, 50, 50, ctx, canvas);
requestAnimationFrame(() => mySnake.draw()); // the first parameter must call draw() otherwise this.xPos will be undefined

/* No class */
// function Snake(xPos, yPos, height, width) {
//   this.xPos = xPos;
//   this.yPos = yPos;
//   this.height = height;
//   this.width = width;
// }

// Snake.prototype.drawSnake = function () {
//   ctx.beginPath();
//   ctx.rect(this.xPos, this.yPos, 50, 50);
//   ctx.fillStyle = "#FF0000";
//   ctx.fill();
//   ctx.closePath();
// };

// Snake.prototype.draw = function () {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   this.drawSnake();
//   if (right) {
//     this.xPos += 10;
//     if (this.xPos + this.width > canvas.width) {
//       this.xPos = canvas.width - this.width;
//     }
//   } else if (left) {
//     this.xPos -= 10;
//     if (this.xPos < 0) {
//       this.xPos = 0;
//     }
//   } else if (up) {
//     this.yPos -= 10;
//     if (this.yPos < 0) {
//       this.yPos = 0;
//     }
//   } else if (down) {
//     this.yPos += 10;
//     if (this.yPos + this.height > canvas.height) {
//       this.yPos = canvas.height - this.height;
//     }
//   }
//   requestAnimationFrame(() => this.draw());
// };

/* No prototype version */
// const snakeProps = {
//   moveRight: function (units) {},
//   moveLeft: function (units) {},
//   moveUp: function (units) {},
//   moveDown: function (units) {},
// };
// function SnakeThree(xPos, yPos) {
//   // let snake = {};
//    // let snake = Object.create(Snake.prototype);
// snake.xPos = xPos;
// snake.yPos = yPos;
// snake.height = height;
// snake.width = width;
// return snake;
/* above is equivalent to bottom + `new` keyword*/
// }
// let z = SnakeTwo(1, 1);
