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

    it('should start with speed, gravity, and gravitySpeed of 0', function() {
        const platform = new Platform(15, 15, 15, 15);
        assert.equal(platform.speed, 0);
        assert.equal(platform.gravity, 0);
        assert.equal(platform.gravitySpeed, 0);
    });

});