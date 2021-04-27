const COLS = 3;
const ROWS = 3;
const WIDTH = 600;
const HEIGHT = 600;

const PLAYER = 1;
const COMPUTER = 2;

function Game() {
  const canvas = document.getElementById("cv");
  canvas.onmousedown = this._handleMouseDown.bind(this);

  const ctx = canvas.getContext("2d");

  this.ctx = ctx;
  this.width = WIDTH;
  this.height = HEIGHT;
  this.colSize = WIDTH / COLS;
  this.rowSize = HEIGHT / ROWS;
  this.turn = PLAYER;

  this.grid = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
  ];
}

Game.prototype.init = function() {
}

Game.prototype.start = function() {
  this.calculate();
  this.draw();
}

Game.prototype.calculate = function() {
}

Game.prototype._handleMouseDown = function(mouse) {
  const xPos = mouse.offsetX;
  const yPos = mouse.offsetY;

  const x = Math.floor(xPos / this.colSize);
  const y = Math.floor(yPos / this.rowSize);
  this.playerStep(x, y);
}

Game.prototype.playerStep = function(x, y) {
  this._step(x, y);
  this.draw();
}

Game.prototype.computerStep = function() {
  this._step(null, null);
  this.draw();
}

Game.prototype._step = function(x, y) {
  switch(this.turn) {
  case PLAYER:
    this.grid[y][x] = PLAYER;
    this.turn = COMPUTER;
    break;

  case COMPUTER:
    const { aiX, aiY } = this._findNextPos();
    this.grid[aiY][aiX] = COMPUTER;
    this.turn = PLAYER;
    break;
  }
}

Game.prototype.checkWin = function(grid) {

}

Game.prototype._findNextPos = function() {
  return {
    aiX: 1,
    aiY: 2
  }
}

Game.prototype._drawLine = function(x1, y1, x2, y2) {
  this.ctx.beginPath();
  this.ctx.moveTo(x1, y1);
  this.ctx.lineTo(x2, y2);
  this.ctx.stroke();
}

Game.prototype._drawPlayer = function(xPos, yPos) {
  this.ctx.fillText("X", xPos, yPos);
}

Game.prototype._drawComputer = function(xPos, yPos) {
  this.ctx.fillText("O", xPos, yPos);
}

Game.prototype._clear = function() {
  this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

Game.prototype._drawGrid = function(rows, cols) {
  for (let x=1; x<cols; x++) {
    const xPos = x * this.colSize;
    this._drawLine(xPos, 0, xPos, HEIGHT);
  }

  for (let y=1; y<rows; y++) {
    const yPos = y * this.rowSize;
    this._drawLine(0, yPos, WIDTH, yPos);
  }

  for (let y=0; y<this.grid.length; y++) {
    for (let x=0; x<this.grid[y].length; x++) {
      const xPos = (x + 0.5) * this.colSize;
      const yPos = (y + 0.5) * this.rowSize;

      switch (this.grid[y][x]) {
      case PLAYER:
        this._drawPlayer(xPos, yPos);
        break;

      case COMPUTER:
        this._drawComputer(xPos, yPos);
        break;
      }
    }
  }
}

Game.prototype.draw = function() {
  this._clear();
  this._drawGrid(ROWS, COLS);
}

const game = new Game();
game.init();
game.start();