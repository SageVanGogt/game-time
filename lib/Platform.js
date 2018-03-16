class Platform {
    constructor(x, y, width, height) {
        this.position = { x: x, y: y };
        this.size = { w: width, h: height };
    }
}

module.exports = Platform;