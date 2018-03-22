const Gamepieces = require('./Gamepieces.js')

class Platform extends Gamepieces {
  constructor(x, y, width, height) {
    super(x, y, width, height);    
    this.speed = 0;
  }

  movement() {
    this.gravitySpeed += this.gravity;
    this.position.y += this.speed + this.gravitySpeed;
  }

  stop() {
    this.gravitySpeed = 0;
    this.speed = 0;
    this.gravity = 0;
  }
  
  accelerate(speed, gravity) {
    this.speed = speed;
    this.gravity = gravity;
  }
}

module.exports = Platform;