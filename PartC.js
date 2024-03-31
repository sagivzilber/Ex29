/**
 * HTML
 */
/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("canvas");
var canvasHeight = canvas.getAttribute("height");
var canvasWidth = canvas.getAttribute("width");

var ctx = canvas.getContext("2d");

/**
 * Globals
 */
var FPS = 60;

var CIRCLE_R = 20;
var RECT_WIDTH = canvasWidth / 6.5;
var RECT_HEIGHT = 25;

var RECT_MOVEMENT = 10;
var CIRCLE_TIME_TO_HIT_BOTTOM = 5;
var CIRCLE_MOVEMENT = canvasHeight / (FPS * CIRCLE_TIME_TO_HIT_BOTTOM);
var GAME_HANDLE = -1;
var game_status = 0; //  0means start of game, 1 means game is running, 2 means game ends

/**
 * Utils
 */

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawCircle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawRectangle(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Game Engine
 */

function startGame() {
  var startCircle = new Circle(
    canvasWidth / 2,
    canvasHeight - RECT_HEIGHT - CIRCLE_R,
    CIRCLE_R,
    "yellow"
  );
  startCircle.draw();
  rect.draw();
}
function completedLevel() {
  circle.yPos = CIRCLE_R;
  circle.xPos = randomNumber(CIRCLE_R, canvasWidth - CIRCLE_R);
}

var drawings = [];

function tick() {
  clearCanvas();
  for (var i = 0; i < drawings.length; i++) {
    drawings[i].onTick();
    drawings[i].draw();
  }
}

/**
 * Game Entities
 */
class Circle {
  constructor(xPos, yPos, radius, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.color = color;
  }

  onTick() {
    if (this.yPos + this.radius >= canvasHeight) {
      if (
        this.xPos + this.radius >= rect.xPos &&
        this.xPos - this.radius <= rect.xPos + RECT_WIDTH
      ) {
        completedLevel();
      } else {
        game_status = 2;
        clearInterval(GAME_HANDLE);
        return; // lose game outcome
      }
    }
    this.yPos += CIRCLE_MOVEMENT;
  }

  draw() {
    drawCircle(this.xPos, this.yPos, this.radius, this.color);
  }
}

class Rect {
  constructor(xPos, yPos, width, height, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  move(xChange) {
    //rect reaches left edge
    if (this.xPos + xChange <= 0) return;
    //rect reaches right edge
    if (this.xPos + xChange + this.width >= canvasWidth) return;
    this.xPos += xChange;
  }

  onTick() {}

  draw() {
    drawRectangle(this.xPos, this.yPos, this.width, this.height, this.color);
  }
}

var circle = new Circle(
  randomNumber(CIRCLE_R, canvasWidth - CIRCLE_R),
  CIRCLE_R,
  CIRCLE_R,
  "yellow"
);

var rect = new Rect(
  canvasWidth / 2 - RECT_WIDTH / 2,
  canvasHeight - RECT_HEIGHT,
  RECT_WIDTH,
  RECT_HEIGHT,
  "darkblue"
);

drawings.push(rect);
drawings.push(circle);

/**
 * Game Control
 */

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowRight":
      rect.move(RECT_MOVEMENT);
      break;
    case "ArrowLeft":
      rect.move(-RECT_MOVEMENT);
      break;
    case "Enter":
      switch (game_status) {
        case 0:
          game_status = 1;
          GAME_HANDLE = setInterval(tick, 1000 / FPS);
          break;
        case 2:
          game_status = 1;
          completedLevel();
          GAME_HANDLE = setInterval(tick, 1000 / FPS);
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
}

/**
 * Register Callbacks
 */

document.getElementById("body").addEventListener("keydown", onKeyDown);

/**
 * Run Game
 */

startGame();
