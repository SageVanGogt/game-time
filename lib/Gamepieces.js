class Gamepieces {
    constructor(x, y, width, height) {
        this.position = { x, y };
        this.size = { w: width, h: height };
        this.gravity = 0;
        this.gravitySpeed = 0;
    }
}

module.exports = Gamepieces