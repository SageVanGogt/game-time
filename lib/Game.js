const Player = require('./Player.js');
const Platform = require('./Platform.js');

class Game {
  constructor(ctx, canvas) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gamePieces = [new Player(this.canvas.width / 2, this.canvas.height - 15, 15, 15)]
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(this.gamePieces[0].position.x, this.gamePieces[0].position.y, this.gamePieces[0].size.w, this.gamePieces[0].size.h)
  }

  update() {

  }






}


module.exports = Game;