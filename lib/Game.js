const Player = require('./Player.js');
const Platform = require('./Platform.js');


class Game {
  constructor(gameSize) {
    this.gameSize = gameSize;
    this.gamePieces = ([new Platform (this.gameSize.width - 70, this.gameSize.height - 70, 30, 5)]).concat([new Player(this.gameSize.width / 2, this.gameSize.height - 15, 15, 15)])
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
    for (let i = 0; i < this.gamePieces.length; i++) {
      ctx.fillRect(this.gamePieces[i].position.x, this.gamePieces[i].position.y, this.gamePieces[i].size.w, this.gamePieces[i].size.h);
    }
  }

  update() {
    this.gamePieces[1].jump();
    this.gamePieces[1].floor(this.gameSize)
  }

}


module.exports = Game;