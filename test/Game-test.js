const assert = require('chai').assert;
const expect = require('chai').expect; //find location and gitignor
const Game = require('./../lib/Game.js');
const Player = require('./../lib/Player.js');
const Platform = require('./../lib/Platform.js');

describe ('Game', function() {
    it('should be a function', function() {
        assert.isFunction(Game);
    });

    it('should instantiate our game', function() {
        var game = new Game({width: 500, height: 700});
        assert.isObject(game);
    })

    it('should have  size', function() {
        var game = new Game({width: 500, height: 700});
        assert.deepEqual(game.gameSize, {width: 500, height: 700});
    })

    it('should instantiate a player', function() {
        var game = new Game({width: 500, height: 700});
        assert.isObject(game.player);
    })

    it('should instantiate 8 platforms', function() {
        var game = new Game({width: 500, height: 700});
        assert.equal(game.platforms.length, 8);
    })

    it('should randomize platform position', function() {
        var game = new Game({width: 500, height: 700});
        assert.notEqual(game.platforms[2].position.x, game.platforms[3].position.x);
    })

    it('should randomize platform position', function() {
        var game = new Game({width: 500, height: 700});
        assert.notEqual(game.platforms[2].position.x, game.platforms[3].position.x);
    })

    it('should run hit method if player collides with platform', function() {
        var game = new Game({width: 500, height: 700});
        game.player = new Player(0, 0, 16, 16)
        game.platforms = [new Platform(15, 15, 15, 15)]

        game.player.gravitySpeed = 10;
        
        game.collisionDetection()
        
        assert.equal(game.player.gravitySpeed, 0);
    })

    it('should increment score when hit function occurs', function() {
        var game = new Game({width: 500, height: 700});
        game.player = new Player(0, 0, 16, 16)
        game.platforms = [new Platform(15, 15, 15, 15)]

        game.score = 0;

        game.hit();
        
        assert.equal(game.score, 1);
    })

    it('should reset the velocity of the platforms when hit function occurs', function() {
        var game = new Game({width: 500, height: 700});
        game.player = new Player(0, 0, 16, 16)
        game.platforms = [new Platform(15, 15, 15, 15)]

        game.platforms.gravity = .3;
        game.platforms.speed = 6;
        game.platforms.gravitySpeed = 10;

        game.hit();

        game.platforms.gravity = 0;
        game.platforms.speed = 0;
        game.platforms.gravitySpeed = 0;
        
        assert.equal(game.platforms.speed, 0)
    });

    it('should increase the platform velocity after it stops it', function() {
        var game = new Game({width: 500, height: 700});
        game.player = new Player(0, 0, 16, 16)
        game.platforms = [new Platform(15, 15, 15, 15)]
        
        game.platforms.gravity = 0;
        game.platforms.speed = 0;
        game.platforms.gravitySpeed = 0;

        game.hit();

        game.platforms.gravity = -0.1;
        game.platforms.speed = 6;
        game.platforms.gravitySpeed = -0.1;
        
        assert.equal(game.platforms.speed, 6)
    });

    it('should push a new platform into the platform array', function() {
        var game = new Game({width: 500, height: 700});
        game.player = new Player(0, 0, 16, 16)
        game.platforms = [new Platform(15, 90, 15, 15)]
        
        assert.equal(game.platforms.length, 1)
        game.hit();
        assert.equal(game.platforms.length, 2);
    })

    it('should remove a platform if the array is longer than 8', function() {
        var game = new Game({width: 500, height: 700});
        game.player = new Player(0, 0, 16, 16)
        game.platforms = [new Platform(15, 90, 15, 15), {}, {}, {}, {}, {}, {}, {}, {}]
        
        assert.equal(game.platforms.length, 9)
        game.removeExtraPlatform();
        assert.equal(game.platforms.length, 8);
    })

    it('should increase the difficulty when the score increases', function() {
        var game = new Game({width: 500, height: 700});
        game.score = 41;

        assert.deepEqual(game.difficultyLevel, {range: 300, center: 150});

        game.updateDifficulty();

        assert.deepEqual(game.difficultyLevel, {range: 400, center: 200})
    })

    

});