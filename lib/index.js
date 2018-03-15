const Game = require('./Game.js');
const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');  

const gameSize = { width: canvas.width, height: canvas.height };
console.log(gameSize)
const game = new Game(gameSize);

function gameLoop() {
  game.draw(ctx);
  game.update();
  requestAnimationFrame(gameLoop);
};

gameLoop();

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      game.gamePieces[0].moveLeft();
    break;

    case 32: // Up
     game.gamePieces[0].accelerate(-7, .2);
    break;

    case 39: // Right
     game.gamePieces[0].moveRight();
    break;
  }
}, false);
