class Player {
  constructor(x, y, width, height) {
    this.position = { x: x, y: y }
    this.size = { w: width, h: height }
    this.velocity = { x: 0, y: 0 }
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
