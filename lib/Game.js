const Player = require('./Player.js');
const Platform = require('./Platform.js');

class Game {
  constructor(gameSize) {
    this.gameSize = gameSize;
    this.difficultyLevel = {range: 300, center: 150};
    this.score = 0;
    this.startPlatform = new Platform(0, gameSize.height - 15, gameSize.width, 15)
    this.player = new Player(this.gameSize.width / 2, this.gameSize.height - 75, 60, 60)
    this.platforms = [new Platform ((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), this.gameSize.height - 125, 100, 15), 
                      new Platform ((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), this.gameSize.height - 250, 100, 20), 
                      new Platform ((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), this.gameSize.height - 375, 100, 20),
                      new Platform ((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), this.gameSize.height - 500, 100, 20),
                      new Platform ((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), this.gameSize.height - 625, 100, 20),
                      new Platform ((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), this.gameSize.height - 750, 100, 20),
                      new Platform ((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), this.gameSize.height - 825, 100, 20),
                      new Platform ((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), this.gameSize.height - 950, 100, 20)];
  }
                    
  update() {
    this.player.movement();
    this.player.wallHit(this.gameSize);
    this.player.floorHit(this.gameSize);
    this.platforms.forEach( platform => platform.movement());   
    this.collisionDetection();
    this.removeExtraPlatform();
    this.updateDifficulty();
  }
  
  
  draw(ctx) {
    const playerImage = new Image();
    const platformImage = new Image();
    platformImage.src = './images/breadstick.png';
    playerImage.src = './images/pizzadude.png';
    ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
    ctx.drawImage(playerImage, this.player.position.x, this.player.position.y);
    this.platforms.forEach ( platform => ctx.drawImage(platformImage, platform.position.x, platform.position.y))
    ctx.fillRect(this.startPlatform.position.x, 
      this.startPlatform.position.y, 
      this.startPlatform.size.w, 
      this.startPlatform.size.h);
    }
    
  collisionDetection() { 
    const player = this.player;
    this.platforms.forEach( platform => {
      if (player.position.x + player.size.w >= platform.position.x && 
        player.position.x <= platform.position.x + platform.size.w && 
        player.position.y + player.size.h >= platform.position.y &&                              
        player.position.y + player.size.h < platform.position.y + platform.size.h) {
          this.hit();
        }
      })
    }
    
  hit() {
    new Audio('/sounds/sfx_movement_jump17.wav').play();
    this.player.gravitySpeed = 0; 
    this.score++;
    this.updatePlatformArr();
    this.platforms.forEach( platform => platform.stop());
    this.platforms.forEach( platform => platform.accelerate(6, -0.1));
  }
  
  updatePlatformArr() {
    if (this.platforms[this.platforms.length - 1].position.y > 80) {
      if (this.player.position.x >= 650) {
        this.platforms.push(new Platform((this.player.position.x - (Math.floor(Math.random() * this.difficultyLevel.range))), 10, 100, 20));
      } else if (this.player.position.x <= 150) {
        this.platforms.push(new Platform((Math.floor(Math.random() * this.difficultyLevel.range) + this.player.position.x), 10, 100, 20));
      } else {
        this.platforms.push(new Platform((Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center)), 10, 100, 20));
      }
    }
  }
    
  removeExtraPlatform() {
    if (this.platforms.length > 8) {
      this.platforms.shift();
    } 
  }

  updateDifficulty() {
    if (this.score > 40) {
      this.difficultyLevel.range = 400;
      this.difficultyLevel.center = 200;
    }
    if (this.score > 60) {
      this.difficultyLevel.range = 600;
      this.difficultyLevel.center = 300;
    }
  }

  gameOver(ctx) {
    const floor = this.gameSize.height - this.player.size.h;
    const gameOverImage = new Image();
    gameOverImage.src = './images/gameoverpizza.png';
    if (this.player.position.y > floor) {
      ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
      ctx.drawImage(gameOverImage, 0, 0);
    }
  }
}

module.exports = Game
    
    
    