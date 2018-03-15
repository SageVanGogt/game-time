const Game = require('./Game.js');

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');  

const game = new Game(ctx, canvas);
// debugger;

function gameLoop() {
  game.draw();
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
     game.gamePieces[0].moveUp();
    break;

    case 39: // Right
     game.gamePieces[0].moveRight();
    break;
  }
}, false);
