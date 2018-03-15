const assert = require('chai').assert;
const Game = require('./../lib/Game.js');

describe ('Game', function() {
    it('should be a function', function() {
        assert.isFunction(Game);
    });

    it('should instantiate our game', function() {
        var game = new Game({width: 500, height: 700});
        assert.isObject(game);
    })

    it('game should havea  size', function() {
        var game = new Game({width: 500, height: 700});
        assert.deepEqual(game.gameSize, {width: 500, height: 700});
    })

    it('it should have game pieces', function() {
        var game = new Game({width: 500, height: 700});
        assert.equal(game.gamePieces.length, 1)
    })
});