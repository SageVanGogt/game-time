const Player = require('./Player.js');
const Platform = require('./Platform.js');


class Game {
  constructor(gameSize) {
    this.gameSize = gameSize;
    this.startPlatform = new Platform(0, gameSize.height - 15, gameSize.width, 15)
    this.gamePieces = ([new Player(this.gameSize.width / 2, this.gameSize.height - 30, 15, 15)]).concat([new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 125, 50, 15), 
                                                                                                        new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 250, 50, 15), 
                                                                                                        new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 375, 50, 15),
                                                                                                        new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 500, 50, 15),
                                                                                                        new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 625, 50, 15)])
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
    for (let i = 0; i < this.gamePieces.length; i++) {
      ctx.fillRect(this.gamePieces[i].position.x, this.gamePieces[i].position.y, this.gamePieces[i].size.w, this.gamePieces[i].size.h);
    }
    ctx.fillRect(this.startPlatform.position.x, this.startPlatform.position.y, this.startPlatform.size.w, this.startPlatform.size.h)
  }

  
  collisionDetection(ctx) { //consider changing .center back to .position\
    const player = this.gamePieces[0];
    player.jump();
    this.gamePieces.splice(0, 1);    
    const colliding = this.gamePieces.filter( platform => {
      if (player.position.x + player.size.w >= platform.position.x && 
        player.position.x <= platform.position.x + platform.size.w && 
        player.position.y + player.size.h >= platform.position.y &&                              
        player.position.y + player.size.h < platform.position.y + platform.size.h) {
          player.gravitySpeed = 0;
          this.gamePieces.push(new Platform((Math.floor(Math.random() * 500)), 10, 50, 15));        
          this.gamePieces.forEach( platform => platform.stop());
          this.gamePieces.forEach( platform => platform.accelerate(6, -0.1));
          if (this.gamePieces.length > 8) {
            this.gamePieces.splice(0, 1)
          }
          }
        })
        this.gamePieces.forEach( platform => platform.move())//move this into update and unify code purpose 
        this.gamePieces.splice(0, 0, player);      
      }
      gameOver(ctx) {
        this.gamePieces[0].floorHit(this.gameSize, ctx);
      }
      
    }
    module.exports = Game;
    
    
    