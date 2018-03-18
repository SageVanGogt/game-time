const Player = require('./Player.js');
const Platform = require('./Platform.js');


class Game {
  constructor(gameSize) {
    this.gameSize = gameSize;
    this.gamePieces = ([new Player(this.gameSize.width / 2, this.gameSize.height - 15, 15, 15)]).concat([new Platform (this.gameSize.width - 70, this.gameSize.height - 70, 50, 15)])
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
    for (let i = 0; i < this.gamePieces.length; i++) {
      ctx.fillRect(this.gamePieces[i].position.x, this.gamePieces[i].position.y, this.gamePieces[i].size.w, this.gamePieces[i].size.h);
    }
  }

  update() { //want to change b/c this is more player information than the game needs
    this.gamePieces[0].jump();
    this.gamePieces[0].floor(this.gameSize);
  }

  collisionDetection() { //consider changing .center back to .position\
    const player = this.gamePieces[0];
    this.gamePieces.splice(0, 1)    
    const colliding = this.gamePieces.filter( platform => {
      if (player.position.x + player.size.w >= platform.position.x && 
          player.position.x <= platform.position.x + platform.size.w && 
          player.position.y + player.size.h >= platform.position.y &&                              
          player.position.y + player.size.h < platform.position.y + platform.size.h) {
        player.gravitySpeed = 0;
        this.gamePieces.push(new Platform((Math.floor(Math.random() * 500)), -10, 50, 15);

        const updatePlatforms = this.gamePieces.forEach( platform => {
          platform.speed
        })
      }
    })
    this.gamePieces.move()//move this into update and unify code purpose 
    this.gamePieces.splice(0, 0, player);      
    }
  }
    module.exports = Game;

      
      