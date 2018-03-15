class Player {
  constructor(x, y, width, height) {
    this.position = { x: x, y: y };
    this.size = { w: width, h: height };
    this.speed = { x: 0, y: 0 };
    this.gravity = 0;
    this.gravitySpeed = 0;
  }
  jump() {
    this.gravitySpeed += this.gravity;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y + this.gravitySpeed;
  }

  accelerate(val) {
    this.gravity = val;
    this.jump();
  }

  moveLeft() {
      this.position.x -= 1;
    };
    
  moveRight() {
      this.position.x += 1;
    };

};


module.exports = Player;
