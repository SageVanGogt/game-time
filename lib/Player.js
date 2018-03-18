const Game = require('./Game.js');

class Player {
  constructor(x, y, width, height) {
    this.position = { x: x, y: y };
    this.size = { w: width, h: height };
    this.speed = { x: 0 , y: 0 };
    this.gravity = 0;
    this.gravitySpeed = 0;
  }

  jump() {
    this.gravitySpeed += this.gravity;
    // this.position.x += this.speed.x;
    this.position.y += this.speed.y + this.gravitySpeed;
  }

  accelerate(speed, gravity) {
    this.speed.y = speed;
    this.gravity = gravity;
  }

  floorHit(gameSize, ctx) {
    const floor = gameSize.height - this.size.h;
    const gameOverImage = new Image();
    gameOverImage.src = './../images/gameoverpizza.png';
      if (this.position.y > floor) {
        ctx.clearRect(0, 0, gameSize.width, gameSize.height);
        ctx.drawImage(gameOverImage, 0, 0);
    }
  }

  moveLeft() {
    console.log('this')
      this.position.x -= 8;
    };
    
  moveRight() {
      this.position.x += 8;
    };

};


module.exports = Player;
