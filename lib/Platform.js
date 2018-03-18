class Platform {
    constructor(x, y, width, height) {
        this.position = { x: x, y: y };
        this.size = { w: width, h: height };
        this.speed = -3;
    }

    move() {
        this.position.y +=  this.speed;
    }
}

module.exports = Platform;