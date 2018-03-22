const assert = require('chai').assert;
const Platform = require('./../lib/Platform.js');

describe ('Game', function() {
    
    it('should be a function', function() {
        assert.isFunction(Platform);
    });

    it('should instantiate our platform', function() {
        const platform = new Platform(15, 15, 15, 15);
        assert.isObject(platform);
    });

    it('should have a position', function() {
        const platform = new Platform(15, 15, 15, 15);
        assert.deepEqual(platform.position, {x: 15, y: 15});
    });

    it('should have a size', function() {
        const platform = new Platform(15, 15, 15, 15);
        assert.deepEqual(platform.size, {w: 15, h: 15});
    });
    
    it('should be able to accelerate', function() {
        const platform = new Platform(15, 15, 15, 15);
        platform.speed = 0;
        platform.gravity = 0;

        platform.accelerate(4, .2);

        platform.speed = 4;
        platform.gravity = .2;
    });

    it('should freeze in place when stop function is called ', function() {
        const platform = new Platform(15, 15, 15, 15);
        platform.speed = 6;
        platform.gravity = .2;
        platform.gravitySpeed = 4;

        platform.stop();

        assert.equal(platform.speed, 0);
        assert.equal(platform.gravity, 0);
        assert.equal(platform.gravitySpeed, 0);
    });

    it('should have a size', function() {
        const platform = new Platform(15, 15, 15, 15);
        assert.deepEqual(platform.size, {w: 15, h: 15});
    });
});