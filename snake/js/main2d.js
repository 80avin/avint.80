// JavaScript Snake example
// Author Jan Bodnar
// http://zetcode.com/javascript/snake/

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 300;
const C_WIDTH = 300;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

function init() {

  // canvas = document.getElementById('myCanvas');
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  loadImages();
  createSnake();
  locateApple();
  setTimeout("gameCycle()", DELAY);
}

function loadImages() {

  const base64cube = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQoU2P8z8Dwn4EIwDiqEF8oUT94AGX8E/fVVQbMAAAAAElFTkSuQmCC';
  const redCircle = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAc0lEQVQoU43QMQoCUQxF0RNsBHE/LsV2RKbR5TjNINq6E92PChbKyEd/IagkTSC5yUteeMW8YdsynjEqhROPntueJQ5RoA39iul76CN1nNe00XDZMfkG1dqCaxy5V7lfcDkjBoZ/22ovD6al08+k7cka/gTHbSjnzgCaigAAAABJRU5ErkJggg==';
  const greenCircle = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAdklEQVQoU2NkgIAItTibxU/SP7J8s7oMFuA6pssgM5P/z61FR2IZGBhWMIIUyfQ5LHlSeIAZqgmFkul3+Puk6EAMo1qcze9bC4+wYFMEE1OLt/nDyHVU9z/MOlyKQc5gZPjP8B+faTA54hUSbTXRniE6eIgNcABmAkIjyKXdLQAAAABJRU5ErkJggg==';
  const blueCircle = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAd0lEQVQoU2NkgIAIW4aEBR8Y0tguM1gyggR0GY7/F2CY9esww4IEBgaGFSDBCEeG/oX7GQrYoJpQKEeGCb/2MxTGM9oyJPw4zDCfHZsimJgtQ+JPRl2GY/9g1uFSDHIGIwPD///4TIPJEa+QaKuJ9gzRwUNsgAMAuuc3w7foebEAAAAASUVORK5CYII=';
  head = new Image();
  head.src = redCircle;// 'head.png';

  ball = new Image();
  ball.src = greenCircle; //'dot.png'; 

  apple = new Image();
  apple.src = blueCircle; //'apple.png'; 
}

function createSnake() {

  dots = 3;

  for (var z = 0; z < dots; z++) {
    x[z] = 50 - z * 10;
    y[z] = 50;
  }
}

function checkApple() {

  if ((x[0] == apple_x) && (y[0] == apple_y)) {

    dots++;
    locateApple();
  }
}

function doDrawing() {

  ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

  if (inGame) {

    ctx.drawImage(apple, apple_x, apple_y, DOT_SIZE, DOT_SIZE);

    for (var z = 0; z < dots; z++) {

      if (z == 0) {
        ctx.drawImage(head, x[z], y[z], DOT_SIZE, DOT_SIZE);
      } else {
        ctx.drawImage(ball, x[z], y[z], DOT_SIZE, DOT_SIZE);
      }
    }
  } else {

    gameOver();
  }
}

function gameOver() {

  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = 'normal bold 18px serif';

  ctx.fillText('Game over', C_WIDTH / 2, C_HEIGHT / 2);
}

function checkApple() {

  if ((x[0] == apple_x) && (y[0] == apple_y)) {

    dots++;
    locateApple();
  }
}

function move() {

  for (var z = dots; z > 0; z--) {

    x[z] = x[(z - 1)];
    y[z] = y[(z - 1)];
  }

  if (leftDirection) {

    x[0] -= DOT_SIZE;
  }

  if (rightDirection) {

    x[0] += DOT_SIZE;
  }

  if (upDirection) {

    y[0] -= DOT_SIZE;
  }

  if (downDirection) {

    y[0] += DOT_SIZE;
  }
}

function checkCollision() {

  for (var z = dots; z > 0; z--) {

    if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
      inGame = false;
    }
  }

  if (y[0] >= C_HEIGHT) {

    inGame = false;
  }

  if (y[0] < 0) {

    inGame = false;
  }

  if (x[0] >= C_WIDTH) {

    inGame = false;
  }

  if (x[0] < 0) {

    inGame = false;
  }
}

function locateApple() {

  var r = Math.floor(Math.random() * MAX_RAND);
  apple_x = r * DOT_SIZE;

  r = Math.floor(Math.random() * MAX_RAND);
  apple_y = r * DOT_SIZE;
}

function gameCycle() {

  if (inGame) {

    checkApple();
    checkCollision();
    move();
    doDrawing();
    setTimeout("gameCycle()", DELAY);
  }
}

onkeydown = function (e) {

  var key = e.keyCode;
  console.log(e.key);

  if ((key == LEFT_KEY) && (!rightDirection)) {

    leftDirection = true;
    upDirection = false;
    downDirection = false;
  }

  if ((key == RIGHT_KEY) && (!leftDirection)) {

    rightDirection = true;
    upDirection = false;
    downDirection = false;
  }

  if ((key == UP_KEY) && (!downDirection)) {

    upDirection = true;
    rightDirection = false;
    leftDirection = false;
  }

  if ((key == DOWN_KEY) && (!upDirection)) {

    downDirection = true;
    rightDirection = false;
    leftDirection = false;
  }
};

init();

function drawSnakeGame(){

}