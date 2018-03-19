
const Game = require('./Game.js');

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');  
const gameSize = { width: canvas.width, height: canvas.height };



const game = new Game(gameSize);

function gameLoop() {
  game.draw(ctx);
  game.collisionDetection();
  game.gameOver(ctx);
  requestAnimationFrame(gameLoop);
};

function drawStartScreen() { //condition, if score is less than one, run. 
  console.log('bang')
  const gameStartImg = new Image();
  gameStartImg.src = './../images/startscreen.gif';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gameStartImg, 0, 0);
  if (game.score === 0) {
    requestAnimationFrame(drawStartScreen);
  }
}
drawStartScreen()

//want to change
window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
    game.player.moveLeft();
    break;
    
    case 32: // Up
    game.player.accelerate(-7, .2);
    break;
    
    case 39: // Right
    game.player.moveRight();
    break;
    
    case 13: // StartGame
    gameLoop();    
    break;
  }
}, false);

// const playerImage = new Image();
// playerImage.src = './../images/pizzadude.png';
// ctx.drawImage(playerImage, 0, 0);
