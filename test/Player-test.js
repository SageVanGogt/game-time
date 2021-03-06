const assert = require('chai').assert;
const Player = require('./../lib/Player.js');

describe ('Player', function() {
    it('should be a function', function() {
        assert.isFunction(Player);
    });

    it('should instantiate our Player', function() {
        var player = new Player();

        assert.isObject(player);
    });

    it('should have a position', function() {
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

        player.movement(); // 60-63 seperate test
        
        assert.equal(player.gravity, 0 );
        assert.deepEqual(player.speed, { x: 0, y: 0 });

        player.accelerate(-7, .2);

        player.movement();

        assert.equal(player.gravity, .2);
        assert.equal(player.gravitySpeed, .2);
        assert.deepEqual(player.speed,{ x: 0, y: -7 });
    });

    it('should lose downward velocity when hitting the floor', function() {
        var player = new Player(15, 686, 15, 15);

        player.floorHit( { height:700 } );

        assert.equal(player.gravitySpeed, 0)
        
    });

    it('should be able to move left', function() {
        var player = new Player(15, 15, 15, 15);
        player.speed.x = -20;

        player.moveLeft();

        assert.equal(player.speed.x, -25)
    })

    it('should be able to move right', function() {
        var player = new Player(15, 15, 15, 15);
        player.speed.x = 15;
        
        player.moveRight();

        assert.equal(player.speed.x, 20);
    })
});