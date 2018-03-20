const assert = require('chai').assert;
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

    it('should set player gravitySpeed to 0 when collision occurs', function() {
        var game = new Game({width: 500, height: 700});
        game.player = new Player(15, 15, 15, 15)
        game.platforms = [new Platform(15, 15, 15, 15)]

        game.collisionDetection()

        assert.equal(game.player.gravitySpeed, 0);
    })
    

});