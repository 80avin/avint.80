
const Pos = (x, y) => ({ x, y });
class SnakeGame {
  config = {
    width: 300,
    height: 300,
    dotSize: 20,
    delay: 140,
    defaultLength: 3,
    defaultDirection:'r',
    startPos: {
      x: 80,
      y: 80,
    },
    keys: {
      up: ['ArrowUp', 'w', 'W'],
      down: ['ArrowDown', 's', 'S'],
      left: ['ArrowLeft', 'a', 'A'],
      right: ['ArrowRight', 'd', 'D'],
      pause: [' '],
    },
    canCollideWall: true,
    yDownwards: true,
  }
  state = {
    snakePos: [],
    applePos: {
      x: 0,
      y: 0,
    },
    direction:{
      current: 'r',  //l,r,u,d
      next:'r'
    },
    gameOver: false,
    paused: false,
  }
  handlers = {
    gameOver: null,
    keyDown: null,
    gameLoop: null,
  }
  constructor() {
    this.init();
  }
  init() {
    this.createSnake();
    this.locateApple();
    this.state.gameOver=false;
    this.state.paused=true;
    this.state.direction.current=this.state.direction.next=this.config.defaultDirection;
  }
  createSnake() {
    this.state.snakePos = Array(this.config.defaultLength);
    let {x,y} = this.config.startPos;
    x=this.config.dotSize*Math.floor(x/this.config.dotSize)
    y=this.config.dotSize*Math.floor(y/this.config.dotSize)
    for (let i = 0; i < this.state.snakePos.length; ++i) {
      this.state.snakePos[i] = Pos(
        x - i * this.config.dotSize,
        y);
    }
  }
  locateApple() {
    do {
      this.state.applePos.x = this.config.dotSize * Math.floor(Math.random() * this.config.width / this.config.dotSize);
      this.state.applePos.y = this.config.dotSize * Math.floor(Math.random() * this.config.height / this.config.dotSize);
    } while (this.isOnApple());
  }
  isHeadOnApple() {
    const head = this.state.snakePos[0];
    const apple = this.state.applePos;
    return head.x === apple.x && head.y === apple.y;
  }
  isOnApple() {
    return this.state.snakePos.some((pos) => (
      pos.x === this.state.applePos.x &&
      pos.y === this.state.applePos.y
    ));
  }
  eatApple() {
    if (this.isHeadOnApple()) {
      this.state.snakePos.push({...this.state.snakePos[this.state.snakePos.length-1]}); // push a dummy state
      this.locateApple();
    }
  }
  move() {

    // TODO use [].pop() to pop tail and [].unshift(Pos) to add head
    const head = this.state.snakePos[0];
    // // remove tail pos (last)
    this.state.snakePos.pop();
    this.state.snakePos.unshift({ ...head });
    let {current, next} = this.state.direction;
    if((current==='l' && next==='r')||(current==='r' && next==='l')||(current==='u' && next==='d')||(current==='d' && next==='u')){
        next = current;
    }
    switch (next) {
      case 'l':
        this.state.snakePos[0].x -= this.config.dotSize;
        break;
      case 'r':
        this.state.snakePos[0].x += this.config.dotSize;
        break;
      case 'd':
        this.state.snakePos[0].y -= (this.config.yDownwards ? -1 : 1) * this.config.dotSize;
        break;
      case 'u':
        this.state.snakePos[0].y += (this.config.yDownwards ? -1 : 1) * this.config.dotSize;
        break;
      default:
        console.error('invalid direction');
    }
    this.state.direction.current=next;
  }
  keyHandler(e) {
    let k = e.key;
    if (this.config.keys.up.some(_k => _k === k) ) {
      this.state.direction.next = 'u';
    }
    else if (this.config.keys.down.some(_k => _k === k) ) {
      this.state.direction.next = 'd';
    }
    else if (this.config.keys.left.some(_k => _k === k) ) {
      this.state.direction.next = 'l';
    }
    else if (this.config.keys.right.some(_k => _k === k) ) {
      this.state.direction.next = 'r';
    }
    else if (this.config.keys.pause.some(_k => _k === k)) {
      this.pause = !this.state.paused;
    }

    if (this.handlers.keyDown) this.handlers.keyDown(this, e);

  }
  passWall() {
    if (this.config.canCollideWall)
      return;

    const head = this.state.snakePos[0];
    if (head.x < 0)
      head.x = this.config.width + head.x;
    else if (head.x >= this.config.width)
      head.x = -this.config.width + head.x;
    else if (head.y < 0)
      head.y = this.config.height + head.y;
    else if (head.y >= this.config.height)
      head.y = -this.config.height + head.x;
  }
  isCollision() {
    const head = this.state.snakePos[0];
    for (let i = 1; i < this.state.snakePos.length; ++i) {
      if (this.state.snakePos[i].x === head.x && this.state.snakePos[i].y === head.y)
        return true;
    }
    if (!this.config.canCollideWall)
      return false;

    if (head.x < 0)
      return true;
    else if (head.x >= this.config.width)
      return true;
    else if (head.y < 0)
      return true;
    else if (head.y >= this.config.height)
      return true;
    return false;
  }
  checkCollision() {
    if (this.isCollision()) this.state.gameOver = true;
  }
  setConfig(type, value) {
    if (Object.keys(this.config).some(_k => _k === type)) {
      this.config = { ...this.config, [type]: value }
    }
  }
  gameOver() {
    this.state.gameOver = true;
    if (this.handlers.gameOver) this.handlers.gameOver(this);
  }
  setHandler(type, func) {
    if (typeof (func) === 'function' && Object.keys(this.handlers).some(_k => _k === type)) {
      this.handlers = { ...this.handlers, [type]: func }
    }
  }
  set pause(value) {
    if (typeof (value) === 'boolean')
      this.state.paused = value;
  }

  runGame() {
    if (this.state.gameOver)
      this.gameOver();
    else {
      if (!this.state.paused)
        this.gameLoop();
      setTimeout(() => this.runGame(), this.config.delay);
    }
  }
  gameLoop() {
    if (!this.state.gameOver) {
      this.move();
      this.passWall();
      this.checkCollision();
      this.eatApple();
    }
    if (this.handlers.gameLoop) this.handlers.gameLoop(this);
  }
}

const initSnakeGame = () => {
  game = new SnakeGame();
  window.onkeydown = (e) => game.keyHandler(e);
  game.setHandler('gameOver', () => console.log('over'))
  game.setHandler('keyDown', (_, e) => console.log('key', e.key))
  game.setHandler('gameLoop', (g) => console.log('loop to', g.state.snakePos[0]));
  game.runGame();
}

const init2DGame = () => {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  game = new SnakeGame();

  game.setConfig('width', window.innerWidth);
  game.setConfig('height', window.innerHeight);

  window.onkeydown = (e) => game.keyHandler(e);
  game.setHandler('gameOver', () => console.log('over'))
  game.setHandler('keyDown', (_, e) => console.log('key', e.key))
  game.setHandler('gameLoop', (g) => console.log('loop to', g.state.snakePos[0]));

  const draw = () => {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const drawCircleFilled = (x, y, d, c) => {
      ctx.beginPath();
      ctx.arc(x, y, d / 2, 0, 2 * Math.PI);
      ctx.fillStyle = c;
      ctx.fill();
      ctx.closePath();
    }
    // draw apple
    drawCircleFilled(game.state.applePos.x, game.state.applePos.y, game.config.dotSize, '#ff0000');
    game.state.snakePos.forEach((xy, i) => {
      if (i === 0)
        drawCircleFilled(xy.x, xy.y, game.config.dotSize, '#00ff00');
      else
        drawCircleFilled(xy.x, xy.y, game.config.dotSize, '#0000ff');
    });
  }
  draw();
  game.runGame();
}