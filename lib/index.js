var Player = require('./Player.js');
var Platform = require('./Platform.js');

var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

var playerOne = new Player(canvas.width / 2, canvas.height - 15, 15, 15);


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  playerOne.draw(ctx);
  requestAnimationFrame(animate);
};

animate();


