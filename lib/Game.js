const Player = require('./Player.js');
const Platform = require('./Platform.js');


class Game {
  constructor(gameSize) {
    this.gameSize = gameSize;
    this.gamePieces = [new Player(this.gameSize.width / 2, this.gameSize.height - 15, 15, 15)]
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
    ctx.fillRect(this.gamePieces[0].position.x, this.gamePieces[0].position.y, this.gamePieces[0].size.w, this.gamePieces[0].size.h);
  }

  update() {
    this.gamePieces[0].jump();
    this.gamePieces[0].floor(this.gameSize)
  }

}


module.exports = Game;