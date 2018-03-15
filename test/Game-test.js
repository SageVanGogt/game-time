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

    it.skip('it should have a canvas', function(){
        var game = new Game("ctx", "canvas");
        assert.equal(game.ctx, "ctx");
        assert.equal(game.canvas, "canvas");
        // assert.equal(game.gamePieces, [])
    })
});