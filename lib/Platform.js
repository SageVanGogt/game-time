class Platform {
    constructor(x, y, width, height) {
        this.position = { x: x, y: y };
        this.size = { w: width, h: height };
        this.speed = 0;
        this.gravity = 0;
        this.gravitySpeed = 0;
    }

    move() {
        if (this.speed > 0) {
            this.gravitySpeed += this.gravity;
            // this.position.x += this.speed.x;
            this.position.y += this.speed + this.gravitySpeed;
        } 
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