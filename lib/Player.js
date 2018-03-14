class Player {
  constructor(x, y, width, height) {
    this.position = { x: x, y: y }
    this.size = { w: width, h: height }
    this.velocity = { x: 0, y: 0 }
  }

  update() {
    this.velocity.x += 1;
    this.setPosition = 
  }
  draw(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
  }
  
  moveLeft() {
      this.position.x -= 1;
    };
    
  moveRight() {
      this.position.x += 1;
    };
    
  moveUp() {
  
      this.position.y *= .99;
    };


};


module.exports = Player;
