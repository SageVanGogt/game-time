const assert = require('chai').assert;
const Game = require('./../lib/Game.js');
const Player = require('./../lib/Player.js');
const index = require('./../lib/index.js');
const html = require('./../index.html')

describe ('Game', function() {
    it('should be a function', function() {
        assert.isFunction(Game);
    });

    it('should instantiate our game', function() {
        var game = new Game();
        assert.isObject(game);
    })

    it('it should have a canvas', function(){
        // const canvas = document.getElementById('screen');
        // const ctx = canvas.getContext('2d'); 
        var game = new Game("ctx", "canvas");
        assert.equal(game.ctx, "ctx");
        assert.equal(game.canvas, "canvas");
        // assert.equal(game.gamePieces, [])
    })
});