const assert = require('chai').assert;
const Player = require('./../lib/Player.js');

describe ('Player', function() {
    it('should be a function', function() {
        assert.isFunction(Player);
    });

    it('should instantiate our game', function() {
        var player = new Player();
        assert.isObject(player);
    });

    it('should have a poition', function() {
        var player = new Player(5, 5, 5, 5);
        assert.deepEqual(player.position, { x: 5, y: 5 } );
    });

    it('should have a size', function() {
        var player = new Player(5, 5, 5, 5);
        assert.deepEqual(player.size, { w: 5, h: 5 } );
    });

    it('should have a speed', function() {
        var player = new Player();
        assert.deepEqual(player.speed, { x: 0, y: 0 } );
    });

    it('should have a gravity', function() {
        var player = new Player();
        assert.equal(player.gravity, 0 );
    });

    it('should have a gravity rate of acceleration', function() {
        var player = new Player();
        assert.equal(player.gravitySpeed, 0 );
    });

    it('should have a change to speed and gavity when accelerating', function() {
        var player = new Player();
        assert.equal(player.gravity, 0 );
        assert.deepEqual(player.speed, { x: 0, y: 0 });

        player.accelerate(-7, .2);

        assert.equal(player.gravity, .2);
        assert.deepEqual(player.speed,{ x: 0, y: -7 });
    });

    it('should start jumping when acceleration is intialized', function() {
        var player = new Player();

        player.jump();
        
        assert.equal(player.gravity, 0 );
        assert.deepEqual(player.speed, { x: 0, y: 0 });

        player.accelerate(-7, .2);

        player.jump();

        assert.equal(player.gravity, .2);
        assert.equal(player.gravitySpeed, .2);
        assert.deepEqual(player.speed,{ x: 0, y: -7 });
    });

    it('should bounce on a hard surface', function() {
        var player = new Player(15, 686, 15, 15);

        player.floor( { height:700 } );

        assert.equal(player.gravitySpeed, 0)
        
    });
});