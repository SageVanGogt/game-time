class Platform {
  constructor(x, y, width, height) {
    this.position = { x, y };
    this.size = { w: width, h: height };
    this.speed = 0;
    this.gravity = 0;
    this.gravitySpeed = 0;
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