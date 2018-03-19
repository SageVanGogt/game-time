const Player = require('./Player.js');
const Platform = require('./Platform.js');


class Game {
  constructor(gameSize) {
    this.gameSize = gameSize;
    this.startPlatform = new Platform(0, gameSize.height - 15, gameSize.width, 15)
    this.player = new Player(this.gameSize.width / 2, this.gameSize.height - 75, 60, 60)
    this.platforms = [new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 125, 100, 15), 
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 250, 100, 20), 
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 375, 100, 20),
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 500, 100, 20),
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 625, 100, 20),
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 750, 100, 20),
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 825, 100, 20),
                      new Platform ((Math.floor(Math.random() * 500)), this.gameSize.height - 950, 100, 20)];
    this.score = 0;
  }


  draw(ctx) {
    const playerImage = new Image();
    const platformImage = new Image();
    platformImage.src = './../images/breadstick.png';
    playerImage.src = './../images/pizzadude.png';
    ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
    ctx.drawImage(playerImage, this.player.position.x, this.player.position.y);
    this.platforms.forEach ( platform => ctx.drawImage(platformImage, platform.position.x, platform.position.y))
    ctx.fillRect(this.startPlatform.position.x, 
                 this.startPlatform.position.y, 
                 this.startPlatform.size.w, 
                 this.startPlatform.size.h);
  }

  collisionDetection() { 
    const player = this.player
    player.jump();
    const colliding = this.platforms.filter( platform => {
      if (player.position.x + player.size.w >= platform.position.x && 
        player.position.x <= platform.position.x + platform.size.w && 
        player.position.y + player.size.h >= platform.position.y &&                              
        player.position.y + player.size.h < platform.position.y + platform.size.h) {
          player.gravitySpeed = 0;
          this.score++;
          this.updatePlatformArr();
          this.platforms.forEach( platform => platform.stop());
          this.platforms.forEach( platform => platform.accelerate(6, -0.1));
        }
      })
      this.platforms.forEach( platform => platform.move())//move this into update and unify code purpose     
    }
    
    updatePlatformArr() {
      if (this.platforms[7].position.y > 50) {
        this.platforms.push(new Platform((Math.floor(Math.random() * 500)), 10, 100, 20));
        this.platforms.shift();
    }
    // if (this.score < 10) {
    // } 
    //  else if (this.score > 10 && this.score < 20) {
    //   this.platforms.push(new Platform((Math.floor(Math.random() * 500)), 10, 80, 20));   
    // } else if (this.score > 20) {
    //   this.platforms.push(new Platform((Math.floor(Math.random() * 500)), 10, 60, 20));        
    // }
  }

  gameOver(ctx) {
    this.player.floorHit(this.gameSize, ctx);
  }
    
}
module.exports = Game;
    
    
    
    // possible random number generation:
    // (Math.floor(Math.random() * 100) + (this.player.position.x - 50)