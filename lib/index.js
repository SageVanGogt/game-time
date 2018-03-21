// import { WSAECONNRESET } from 'constants';

const Game = require('./Game.js');

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');  
const gameSize = { width: canvas.width, height: canvas.height };

const game = new Game(gameSize);

function gameLoop() {
  game.update();
  game.draw(ctx);
  game.gameOver(ctx);
  score.text(game.score);
  requestAnimationFrame(gameLoop);
};

function drawStartScreen() { 
  const gameStartImg = new Image();
  gameStartImg.src = './../images/startscreen.png';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gameStartImg, 0, 0);
  if (game.score === 0) {
    requestAnimationFrame(drawStartScreen);
  }
}
drawStartScreen()

// want to change
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
    
    case 13: // Enter
    if(game.player.position.y > canvas.height){
      location.reload();
    }
    gameLoop();    
    break;
  }
}, false);

const score = $('#score');
const oldScores = $('#past-scores');
const userName = $('#user-name');
const submitBtn = $('#submit-name');
submitBtn.on('click', saveUser);
pullLocalStorage()


function saveUser(event) {
  if (game.player.position.y > gameSize.height) {
    event.preventDefault();
    const userNameVal = userName.val();
    const player = {name: userNameVal, score: game.score}
    prependUser(player)
    toLocalStorage(player);
  }
}

function prependUser(player) {
  oldScores.prepend(`<li>${player.name}: ${player.score}</li>`);
}

function toLocalStorage(player) {
  const key = Date.now();
  localStorage.setItem(key, JSON.stringify(player));
}

function pullLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
  const storedScores = JSON.parse(localStorage.getItem(localStorage.key(i)))
    prependUser(storedScores)
  }
}

