const Game = require('./Game.js');



const game = new Game();


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw();
  requestAnimationFrame(gameLoop);
};

gameLoop();

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      playerOne.moveLeft();
    break;

    case 32: // Up
     playerOne.moveUp();
    break;

    case 39: // Right
     playerOne.moveRight();
    break;
  }
}, false);
