class Player {
  constructor(x, y, width, height) {
    this.position = { x: x, y: y };
    this.size = { w: width, h: height };
    this.speed = { x: 0, y: 0 };
    this.gravity = 0;
    this.gravitySpeed = 0;
  }

  movement() {
    this.gravitySpeed += this.gravity;
    this.position.x += this.speed.x * 0.3;
    this.position.y += this.speed.y + this.gravitySpeed;
  }

  accelerate(speed, gravity) {  
    this.speed.y = speed;
    this.gravity = gravity;
  }

  floorHit(gameSize) {
    const floor = gameSize.height - this.size.h;
      if (this.position.y > floor) {
        this.speed.y = 0;
      }
  }

  wallHit(gameSize) {
    if (this.position.x > gameSize.width) { 
      this.position.x = 0; 
    }
    if (this.position.x < 0) { 
      this.position.x = (gameSize.width - this.size.w);
    }
  }

  moveLeft() { 
      if (this.speed.x >= -20) {
        this.speed.x += -5;
      }
  }
    
  moveRight() {
    if (this.speed.x <= 20) {
      this.speed.x += 5;
    }
  }
}

module.exports = Player
