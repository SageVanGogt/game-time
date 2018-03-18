const Player = require('./Player.js');
const Platform = require('./Platform.js');


class Game {
  constructor(gameSize) {
    this.gameSize = gameSize;
    this.startPlatform = new Platform(0, gameSize.height - 15, gameSize.width, 15)
    this.player = new Player(this.gameSize.width / 2, this.gameSize.height - 45, 30, 30)
    this.platforms = [new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 125, 50, 15), 
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 250, 50, 15), 
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 375, 50, 15),
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 500, 50, 15),
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 625, 50, 15)];
    this.score = 0;
  }


  draw(ctx) {
    const playerImage = new Image();
    playerImage.src = './../images/pizzadude.png';
    ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
    ctx.drawImage(playerImage, this.player.position.x, this.player.position.y);
    for (let i = 0; i < this.platforms.length; i++) {
      ctx.fillRect(this.platforms[i].position.x, this.platforms[i].position.y, this.platforms[i].size.w, this.platforms[i].size.h);
    }
    ctx.fillRect(this.startPlatform.position.x, this.startPlatform.position.y, this.startPlatform.size.w, this.startPlatform.size.h);
  }

  
  collisionDetection() { //consider changing .center back to .position\
    const player = this.player
    player.jump();
    const colliding = this.platforms.filter( platform => {
      if (player.position.x + player.size.w >= platform.position.x && 
        player.position.x <= platform.position.x + platform.size.w && 
        player.position.y + player.size.h >= platform.position.y &&                              
        player.position.y + player.size.h < platform.position.y + platform.size.h) {
          player.gravitySpeed = 0;
          this.score++;
          this.platforms.push(new Platform((Math.floor(Math.random() * 500)), 10, 50, 15));        
          this.platforms.forEach( platform => platform.stop());
          this.platforms.forEach( platform => platform.accelerate(6, -0.1));
          if (this.platforms.length > 8) {
            this.platforms.splice(0, 1)
          }
          }
        })
      this.platforms.forEach( platform => platform.move())//move this into update and unify code purpose     

      }
      gameOver(ctx) {
        this.player.floorHit(this.gameSize, ctx);
      }
    
    }
    module.exports = Game;
    
    
    