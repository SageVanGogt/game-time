/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	new Audio('/sounds/PIZZA ALERT - ORIGINAL 8-BIT SONG.mp3').play();
	var Game = __webpack_require__(1);
	
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	var gameSize = { width: canvas.width, height: canvas.height };
	var score = document.getElementById('score');
	
	var game = new Game(gameSize);
	
	function gameLoop() {
	  game.update();
	  game.draw(ctx);
	  game.gameOver(ctx);
	  score.innerText = game.score;
	  requestAnimationFrame(gameLoop);
	};
	
	function drawStartScreen() {
	  var gameStartImg = new Image();
	  gameStartImg.src = './../images/startscreen.png';
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ctx.drawImage(gameStartImg, 0, 0);
	  if (game.score === 0) {
	    requestAnimationFrame(drawStartScreen);
	  }
	}
	drawStartScreen();
	
	// want to change
	window.addEventListener('keydown', function (event) {
	  switch (event.keyCode) {
	    case 37:
	      // Left
	      game.player.moveLeft();
	      break;
	
	    case 32:
	      // Up
	      game.player.accelerate(-7, .2);
	      break;
	
	    case 39:
	      // Right
	      game.player.moveRight();
	      break;
	
	    case 13:
	      // Enter
	      if (game.player.position.y > canvas.height) {
	        location.reload();
	      }
	      gameLoop();
	      break;
	  }
	}, false);
	
	var userName = document.getElementById('user-name');
	var submitBtn = document.getElementById('submit-name');
	var usersStored = document.getElementById('past-users');
	var userSubmitName = submitBtn.addEventListener('click', addUserToScoreboard);
	
	function addUserToScoreboard(event) {
	  event.preventDefault();
	  var submittedName = userName.value;
	  usersStored.prepend('<li>' + submittedName + '</li>');
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = __webpack_require__(2);
	var Platform = __webpack_require__(3);
	
	var Game = function () {
	  function Game(gameSize) {
	    _classCallCheck(this, Game);
	
	    this.gameSize = gameSize;
	    this.difficultyLevel = { range: 300, center: 150 };
	    this.score = 0;
	    this.startPlatform = new Platform(0, gameSize.height - 15, gameSize.width, 15);
	    this.player = new Player(this.gameSize.width / 2, this.gameSize.height - 75, 60, 60);
	    this.platforms = [new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), this.gameSize.height - 125, 100, 15), new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), this.gameSize.height - 250, 100, 20), new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), this.gameSize.height - 375, 100, 20), new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), this.gameSize.height - 500, 100, 20), new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), this.gameSize.height - 625, 100, 20), new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), this.gameSize.height - 750, 100, 20), new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), this.gameSize.height - 825, 100, 20), new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), this.gameSize.height - 950, 100, 20)];
	  }
	
	  _createClass(Game, [{
	    key: 'update',
	    value: function update() {
	      this.player.movement();
	      this.player.wallHit(this.gameSize);
	      this.platforms.forEach(function (platform) {
	        return platform.movement();
	      });
	      this.collisionDetection();
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      var playerImage = new Image();
	      var platformImage = new Image();
	      platformImage.src = './../images/breadstick.png';
	      playerImage.src = './../images/pizzadude.png';
	      ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
	      ctx.drawImage(playerImage, this.player.position.x, this.player.position.y);
	      this.platforms.forEach(function (platform) {
	        return ctx.drawImage(platformImage, platform.position.x, platform.position.y);
	      });
	      ctx.fillRect(this.startPlatform.position.x, this.startPlatform.position.y, this.startPlatform.size.w, this.startPlatform.size.h);
	    }
	  }, {
	    key: 'collisionDetection',
	    value: function collisionDetection() {
	      var _this = this;
	
	      var player = this.player;
	      var colliding = this.platforms.filter(function (platform) {
	        if (player.position.x + player.size.w >= platform.position.x && player.position.x <= platform.position.x + platform.size.w && player.position.y + player.size.h >= platform.position.y && player.position.y + player.size.h < platform.position.y + platform.size.h) {
	          _this.hit();
	        }
	      });
	    }
	  }, {
	    key: 'hit',
	    value: function hit() {
	      new Audio('/sounds/sfx_movement_jump17.wav').play();
	      this.player.gravitySpeed = 0;
	      this.score++;
	      this.updateDifficulty();
	      this.updatePlatformArr();
	      this.platforms.forEach(function (platform) {
	        return platform.stop();
	      });
	      this.platforms.forEach(function (platform) {
	        return platform.accelerate(6, -0.1);
	      });
	    }
	  }, {
	    key: 'updatePlatformArr',
	    value: function updatePlatformArr() {
	      if (this.platforms[this.platforms.length - 1].position.y > 80) {
	        if (this.player.position.x >= 650) {
	          this.platforms.push(new Platform(this.player.position.x - Math.floor(Math.random() * this.difficultyLevel.range), 10, 100, 20));
	        } else if (this.player.position.x <= 150) {
	          this.platforms.push(new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + this.player.position.x, 10, 100, 20));
	        } else {
	          this.platforms.push(new Platform(Math.floor(Math.random() * this.difficultyLevel.range) + (this.player.position.x - this.difficultyLevel.center), 10, 100, 20));
	        }
	        this.platforms.shift();
	      }
	    }
	  }, {
	    key: 'updateDifficulty',
	    value: function updateDifficulty() {
	      if (this.score > 40) {
	        this.difficultyLevel.range = 400;
	        this.difficultyLevel.center = 200;
	      }
	      if (this.score > 60) {
	        this.difficultyLevel.range = 600;
	        this.difficultyLevel.center = 300;
	      }
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver(ctx) {
	      this.player.floorHit(this.gameSize, ctx);
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = __webpack_require__(1);
	
	var Player = function () {
	  function Player(x, y, width, height) {
	    _classCallCheck(this, Player);
	
	    this.position = { x: x, y: y };
	    this.size = { w: width, h: height };
	    this.speed = { x: 0, y: 0 };
	    this.gravity = 0;
	    this.gravitySpeed = 0;
	  }
	
	  _createClass(Player, [{
	    key: 'movement',
	    value: function movement() {
	      this.gravitySpeed += this.gravity;
	      this.position.x += this.speed.x * 0.3;
	      this.position.y += this.speed.y + this.gravitySpeed;
	    }
	  }, {
	    key: 'accelerate',
	    value: function accelerate(speed, gravity, speedX) {
	      this.speed.y = speed;
	      this.gravity = gravity;
	    }
	  }, {
	    key: 'floorHit',
	    value: function floorHit(gameSize, ctx) {
	      var floor = gameSize.height - this.size.h;
	      var gameOverImage = new Image();
	      gameOverImage.src = './../images/gameoverpizza.png';
	      if (this.position.y > floor) {
	        ctx.clearRect(0, 0, gameSize.width, gameSize.height);
	        ctx.drawImage(gameOverImage, 0, 0);
	        this.speed.y = 0;
	      }
	    }
	  }, {
	    key: 'wallHit',
	    value: function wallHit(gameSize) {
	      if (this.position.x > gameSize.width) {
	        this.position.x = 0;
	      }
	      if (this.position.x < 0) {
	        this.position.x = gameSize.width - this.size.w;
	      }
	    }
	  }, {
	    key: 'moveLeft',
	    value: function moveLeft() {
	      if (this.speed.x >= -20) {
	        this.speed.x += -5;
	      }
	    }
	  }, {
	    key: 'moveRight',
	    value: function moveRight() {
	      if (this.speed.x <= 20) {
	        this.speed.x += 5;
	      }
	    }
	  }]);
	
	  return Player;
	}();
	
	;
	
	module.exports = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Platform = function () {
	    function Platform(x, y, width, height) {
	        _classCallCheck(this, Platform);
	
	        this.position = { x: x, y: y };
	        this.size = { w: width, h: height };
	        this.speed = 0;
	        this.gravity = 0;
	        this.gravitySpeed = 0;
	    }
	
	    _createClass(Platform, [{
	        key: "movement",
	        value: function movement() {
	            this.gravitySpeed += this.gravity;
	            this.position.y += this.speed + this.gravitySpeed;
	        }
	    }, {
	        key: "stop",
	        value: function stop() {
	            this.gravitySpeed = 0;
	            this.speed = 0;
	            this.gravity = 0;
	        }
	    }, {
	        key: "accelerate",
	        value: function accelerate(speed, gravity) {
	            this.speed = speed;
	            this.gravity = gravity;
	        }
	    }]);
	
	    return Platform;
	}();
	
	module.exports = Platform;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzI1NzM3NjExOTQ1ZWEwMzcwOGMiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL1BsYXRmb3JtLmpzIl0sIm5hbWVzIjpbIkF1ZGlvIiwicGxheSIsIkdhbWUiLCJyZXF1aXJlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJnYW1lU2l6ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2NvcmUiLCJnYW1lIiwiZ2FtZUxvb3AiLCJ1cGRhdGUiLCJkcmF3IiwiZ2FtZU92ZXIiLCJpbm5lclRleHQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkcmF3U3RhcnRTY3JlZW4iLCJnYW1lU3RhcnRJbWciLCJJbWFnZSIsInNyYyIsImNsZWFyUmVjdCIsImRyYXdJbWFnZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImtleUNvZGUiLCJwbGF5ZXIiLCJtb3ZlTGVmdCIsImFjY2VsZXJhdGUiLCJtb3ZlUmlnaHQiLCJwb3NpdGlvbiIsInkiLCJsb2NhdGlvbiIsInJlbG9hZCIsInVzZXJOYW1lIiwic3VibWl0QnRuIiwidXNlcnNTdG9yZWQiLCJ1c2VyU3VibWl0TmFtZSIsImFkZFVzZXJUb1Njb3JlYm9hcmQiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdHRlZE5hbWUiLCJ2YWx1ZSIsInByZXBlbmQiLCJQbGF5ZXIiLCJQbGF0Zm9ybSIsImRpZmZpY3VsdHlMZXZlbCIsInJhbmdlIiwiY2VudGVyIiwic3RhcnRQbGF0Zm9ybSIsInBsYXRmb3JtcyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIngiLCJtb3ZlbWVudCIsIndhbGxIaXQiLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJjb2xsaXNpb25EZXRlY3Rpb24iLCJwbGF5ZXJJbWFnZSIsInBsYXRmb3JtSW1hZ2UiLCJmaWxsUmVjdCIsInNpemUiLCJ3IiwiaCIsImNvbGxpZGluZyIsImZpbHRlciIsImhpdCIsImdyYXZpdHlTcGVlZCIsInVwZGF0ZURpZmZpY3VsdHkiLCJ1cGRhdGVQbGF0Zm9ybUFyciIsInN0b3AiLCJsZW5ndGgiLCJwdXNoIiwic2hpZnQiLCJmbG9vckhpdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzcGVlZCIsImdyYXZpdHkiLCJzcGVlZFgiLCJnYW1lT3ZlckltYWdlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQUlBLEtBQUosQ0FBVSwrQ0FBVixFQUEyREMsSUFBM0Q7QUFDQSxLQUFNQyxPQUFPLG1CQUFBQyxDQUFRLENBQVIsQ0FBYjs7QUFFQSxLQUFNQyxTQUFTQyxTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxLQUFNQyxNQUFNSCxPQUFPSSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFDQSxLQUFNQyxXQUFXLEVBQUVDLE9BQU9OLE9BQU9NLEtBQWhCLEVBQXVCQyxRQUFRUCxPQUFPTyxNQUF0QyxFQUFqQjtBQUNBLEtBQU1DLFFBQVFQLFNBQVNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZDs7QUFFQSxLQUFNTyxPQUFPLElBQUlYLElBQUosQ0FBU08sUUFBVCxDQUFiOztBQUVBLFVBQVNLLFFBQVQsR0FBb0I7QUFDbEJELFFBQUtFLE1BQUw7QUFDQUYsUUFBS0csSUFBTCxDQUFVVCxHQUFWO0FBQ0FNLFFBQUtJLFFBQUwsQ0FBY1YsR0FBZDtBQUNBSyxTQUFNTSxTQUFOLEdBQWtCTCxLQUFLRCxLQUF2QjtBQUNBTyx5QkFBc0JM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S3lCLEtBQUwsQ0FBV3pCLENBQVgsSUFBZ0IsQ0FBaEI7QUFDRDtBQUNGOzs7Ozs7QUFFRjs7QUFHRHVCLFFBQU9DLE9BQVAsR0FBaUJsQyxNQUFqQixDOzs7Ozs7Ozs7Ozs7S0N6RE1DLFE7QUFDRix1QkFBWVMsQ0FBWixFQUFldEIsQ0FBZixFQUFrQnpCLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQztBQUFBOztBQUM3QixjQUFLdUIsUUFBTCxHQUFnQixFQUFFdUIsR0FBR0EsQ0FBTCxFQUFRdEIsR0FBR0EsQ0FBWCxFQUFoQjtBQUNBLGNBQUsrQixJQUFMLEdBQVksRUFBRUMsR0FBR3pELEtBQUwsRUFBWTBELEdBQUd6RCxNQUFmLEVBQVo7QUFDQSxjQUFLdUUsS0FBTCxHQUFhLENBQWI7QUFDQSxjQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGNBQUtYLFlBQUwsR0FBb0IsQ0FBcEI7QUFDSDs7OztvQ0FFVTtBQUNQLGtCQUFLQSxZQUFMLElBQXFCLEtBQUtXLE9BQTFCO0FBQ0Esa0JBQUtqRCxRQUFMLENBQWNDLENBQWQsSUFBbUIsS0FBSytDLEtBQUwsR0FBYSxLQUFLVixZQUFyQztBQUNIOzs7Z0NBRU07QUFDSCxrQkFBS0EsWUFBTCxHQUFvQixDQUFwQjtBQUNBLGtCQUFLVSxLQUFMLEdBQWEsQ0FBYjtBQUNBLGtCQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNIOzs7b0NBRVVELEssRUFBT0MsTyxFQUFTO0FBQ3ZCLGtCQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxrQkFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0g7Ozs7OztBQUdMSCxRQUFPQyxPQUFQLEdBQWlCakMsUUFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMyNTczNzYxMTk0NWVhMDM3MDhjIiwibmV3IEF1ZGlvKCcvc291bmRzL1BJWlpBIEFMRVJUIC0gT1JJR0lOQUwgOC1CSVQgU09ORy5tcDMnKS5wbGF5KClcbmNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL0dhbWUuanMnKTtcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbicpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7ICBcbmNvbnN0IGdhbWVTaXplID0geyB3aWR0aDogY2FudmFzLndpZHRoLCBoZWlnaHQ6IGNhbnZhcy5oZWlnaHQgfTtcbmNvbnN0IHNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlJylcblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGdhbWVTaXplKTtcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGdhbWUudXBkYXRlKCk7XG4gIGdhbWUuZHJhdyhjdHgpO1xuICBnYW1lLmdhbWVPdmVyKGN0eCk7XG4gIHNjb3JlLmlubmVyVGV4dCA9IGdhbWUuc2NvcmU7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG59O1xuXG5mdW5jdGlvbiBkcmF3U3RhcnRTY3JlZW4oKSB7IFxuICBjb25zdCBnYW1lU3RhcnRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgZ2FtZVN0YXJ0SW1nLnNyYyA9ICcuLy4uL2ltYWdlcy9zdGFydHNjcmVlbi5wbmcnO1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIGN0eC5kcmF3SW1hZ2UoZ2FtZVN0YXJ0SW1nLCAwLCAwKTtcbiAgaWYgKGdhbWUuc2NvcmUgPT09IDApIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhd1N0YXJ0U2NyZWVuKTtcbiAgfVxufVxuZHJhd1N0YXJ0U2NyZWVuKClcblxuLy8gd2FudCB0byBjaGFuZ2VcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgY2FzZSAzNzogLy8gTGVmdFxuICAgIGdhbWUucGxheWVyLm1vdmVMZWZ0KCk7XG4gICAgYnJlYWs7XG4gICAgXG4gICAgY2FzZSAzMjogLy8gVXBcbiAgICBnYW1lLnBsYXllci5hY2NlbGVyYXRlKC03LCAuMik7XG4gICAgYnJlYWs7XG4gICAgXG4gICAgY2FzZSAzOTogLy8gUmlnaHRcbiAgICBnYW1lLnBsYXllci5tb3ZlUmlnaHQoKTtcbiAgICBicmVhaztcbiAgICBcbiAgICBjYXNlIDEzOiAvLyBFbnRlclxuICAgIGlmKGdhbWUucGxheWVyLnBvc2l0aW9uLnkgPiBjYW52YXMuaGVpZ2h0KXtcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cbiAgICBnYW1lTG9vcCgpOyAgICBcbiAgICBicmVhaztcbiAgfVxufSwgZmFsc2UpO1xuXG5jb25zdCB1c2VyTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLW5hbWUnKVxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1uYW1lJylcbmNvbnN0IHVzZXJzU3RvcmVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3QtdXNlcnMnKVxuY29uc3QgdXNlclN1Ym1pdE5hbWUgPSBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRVc2VyVG9TY29yZWJvYXJkKVxuXG5mdW5jdGlvbiBhZGRVc2VyVG9TY29yZWJvYXJkKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHN1Ym1pdHRlZE5hbWUgPSB1c2VyTmFtZS52YWx1ZTsgXG4gIHVzZXJzU3RvcmVkLnByZXBlbmQoYDxsaT4ke3N1Ym1pdHRlZE5hbWV9PC9saT5gKTtcbiAgXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNvbnN0IFBsYXllciA9IHJlcXVpcmUoJy4vUGxheWVyLmpzJyk7XG5jb25zdCBQbGF0Zm9ybSA9IHJlcXVpcmUoJy4vUGxhdGZvcm0uanMnKTtcblxuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoZ2FtZVNpemUpIHtcbiAgICB0aGlzLmdhbWVTaXplID0gZ2FtZVNpemU7XG4gICAgdGhpcy5kaWZmaWN1bHR5TGV2ZWwgPSB7cmFuZ2U6IDMwMCwgY2VudGVyOiAxNTB9O1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMuc3RhcnRQbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybSgwLCBnYW1lU2l6ZS5oZWlnaHQgLSAxNSwgZ2FtZVNpemUud2lkdGgsIDE1KVxuICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmdhbWVTaXplLndpZHRoIC8gMiwgdGhpcy5nYW1lU2l6ZS5oZWlnaHQgLSA3NSwgNjAsIDYwKVxuICAgIHRoaXMucGxhdGZvcm1zID0gW25ldyBQbGF0Zm9ybSAoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArICh0aGlzLnBsYXllci5wb3NpdGlvbi54IC0gdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyKSksIHRoaXMuZ2FtZVNpemUuaGVpZ2h0IC0gMTI1LCAxMDAsIDE1KSwgXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IFBsYXRmb3JtICgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kaWZmaWN1bHR5TGV2ZWwucmFuZ2UpICsgKHRoaXMucGxheWVyLnBvc2l0aW9uLnggLSB0aGlzLmRpZmZpY3VsdHlMZXZlbC5jZW50ZXIpKSwgdGhpcy5nYW1lU2l6ZS5oZWlnaHQgLSAyNTAsIDEwMCwgMjApLCBcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgUGxhdGZvcm0gKChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRpZmZpY3VsdHlMZXZlbC5yYW5nZSkgKyAodGhpcy5wbGF5ZXIucG9zaXRpb24ueCAtIHRoaXMuZGlmZmljdWx0eUxldmVsLmNlbnRlcikpLCB0aGlzLmdhbWVTaXplLmhlaWdodCAtIDM3NSwgMTAwLCAyMCksXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IFBsYXRmb3JtICgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kaWZmaWN1bHR5TGV2ZWwucmFuZ2UpICsgKHRoaXMucGxheWVyLnBvc2l0aW9uLnggLSB0aGlzLmRpZmZpY3VsdHlMZXZlbC5jZW50ZXIpKSwgdGhpcy5nYW1lU2l6ZS5oZWlnaHQgLSA1MDAsIDEwMCwgMjApLFxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBQbGF0Zm9ybSAoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArICh0aGlzLnBsYXllci5wb3NpdGlvbi54IC0gdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyKSksIHRoaXMuZ2FtZVNpemUuaGVpZ2h0IC0gNjI1LCAxMDAsIDIwKSxcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgUGxhdGZvcm0gKChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRpZmZpY3VsdHlMZXZlbC5yYW5nZSkgKyAodGhpcy5wbGF5ZXIucG9zaXRpb24ueCAtIHRoaXMuZGlmZmljdWx0eUxldmVsLmNlbnRlcikpLCB0aGlzLmdhbWVTaXplLmhlaWdodCAtIDc1MCwgMTAwLCAyMCksXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IFBsYXRmb3JtICgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kaWZmaWN1bHR5TGV2ZWwucmFuZ2UpICsgKHRoaXMucGxheWVyLnBvc2l0aW9uLnggLSB0aGlzLmRpZmZpY3VsdHlMZXZlbC5jZW50ZXIpKSwgdGhpcy5nYW1lU2l6ZS5oZWlnaHQgLSA4MjUsIDEwMCwgMjApLFxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBQbGF0Zm9ybSAoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArICh0aGlzLnBsYXllci5wb3NpdGlvbi54IC0gdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyKSksIHRoaXMuZ2FtZVNpemUuaGVpZ2h0IC0gOTUwLCAxMDAsIDIwKV07XG4gIH1cbiAgICBcbiAgdXBkYXRlKCkge1xuICAgIHRoaXMucGxheWVyLm1vdmVtZW50KCk7XG4gICAgdGhpcy5wbGF5ZXIud2FsbEhpdCh0aGlzLmdhbWVTaXplKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKCBwbGF0Zm9ybSA9PiBwbGF0Zm9ybS5tb3ZlbWVudCgpKSAgICBcbiAgICB0aGlzLmNvbGxpc2lvbkRldGVjdGlvbigpICAgICAgICAgICAgICAgXG4gIH1cblxuICBkcmF3KGN0eCkge1xuICAgIGNvbnN0IHBsYXllckltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgY29uc3QgcGxhdGZvcm1JbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHBsYXRmb3JtSW1hZ2Uuc3JjID0gJy4vLi4vaW1hZ2VzL2JyZWFkc3RpY2sucG5nJztcbiAgICBwbGF5ZXJJbWFnZS5zcmMgPSAnLi8uLi9pbWFnZXMvcGl6emFkdWRlLnBuZyc7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmdhbWVTaXplLndpZHRoLCB0aGlzLmdhbWVTaXplLmhlaWdodCk7XG4gICAgY3R4LmRyYXdJbWFnZShwbGF5ZXJJbWFnZSwgdGhpcy5wbGF5ZXIucG9zaXRpb24ueCwgdGhpcy5wbGF5ZXIucG9zaXRpb24ueSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuZm9yRWFjaCAoIHBsYXRmb3JtID0+IGN0eC5kcmF3SW1hZ2UocGxhdGZvcm1JbWFnZSwgcGxhdGZvcm0ucG9zaXRpb24ueCwgcGxhdGZvcm0ucG9zaXRpb24ueSkpXG4gICAgY3R4LmZpbGxSZWN0KHRoaXMuc3RhcnRQbGF0Zm9ybS5wb3NpdGlvbi54LCBcbiAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFBsYXRmb3JtLnBvc2l0aW9uLnksIFxuICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UGxhdGZvcm0uc2l6ZS53LCBcbiAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFBsYXRmb3JtLnNpemUuaCk7XG4gIH1cblxuICBjb2xsaXNpb25EZXRlY3Rpb24oKSB7IFxuICAgIGNvbnN0IHBsYXllciA9IHRoaXMucGxheWVyXG4gICAgY29uc3QgY29sbGlkaW5nID0gdGhpcy5wbGF0Zm9ybXMuZmlsdGVyKCBwbGF0Zm9ybSA9PiB7XG4gICAgICBpZiAocGxheWVyLnBvc2l0aW9uLnggKyBwbGF5ZXIuc2l6ZS53ID49IHBsYXRmb3JtLnBvc2l0aW9uLnggJiYgXG4gICAgICAgICAgcGxheWVyLnBvc2l0aW9uLnggPD0gcGxhdGZvcm0ucG9zaXRpb24ueCArIHBsYXRmb3JtLnNpemUudyAmJiBcbiAgICAgICAgICBwbGF5ZXIucG9zaXRpb24ueSArIHBsYXllci5zaXplLmggPj0gcGxhdGZvcm0ucG9zaXRpb24ueSAmJiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgIHBsYXllci5wb3NpdGlvbi55ICsgcGxheWVyLnNpemUuaCA8IHBsYXRmb3JtLnBvc2l0aW9uLnkgKyBwbGF0Zm9ybS5zaXplLmgpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0KCk7XG4gICAgICAgICAgfVxuICAgIH0pXG4gIH1cbiAgICAgIFxuICBoaXQoKSB7XG4gICAgbmV3IEF1ZGlvKCcvc291bmRzL3NmeF9tb3ZlbWVudF9qdW1wMTcud2F2JykucGxheSgpXG4gICAgdGhpcy5wbGF5ZXIuZ3Jhdml0eVNwZWVkID0gMDsgXG4gICAgdGhpcy5zY29yZSsrO1xuICAgIHRoaXMudXBkYXRlRGlmZmljdWx0eSgpO1xuICAgIHRoaXMudXBkYXRlUGxhdGZvcm1BcnIoKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKCBwbGF0Zm9ybSA9PiBwbGF0Zm9ybS5zdG9wKCkpO1xuICAgIHRoaXMucGxhdGZvcm1zLmZvckVhY2goIHBsYXRmb3JtID0+IHBsYXRmb3JtLmFjY2VsZXJhdGUoNiwgLTAuMSkpO1xuICB9XG4gICAgXG4gIHVwZGF0ZVBsYXRmb3JtQXJyKCkge1xuICAgIGlmICh0aGlzLnBsYXRmb3Jtc1t0aGlzLnBsYXRmb3Jtcy5sZW5ndGggLSAxXS5wb3NpdGlvbi55ID4gODApIHtcbiAgICAgIGlmICh0aGlzLnBsYXllci5wb3NpdGlvbi54ID49IDY1MCkge1xuICAgICAgICB0aGlzLnBsYXRmb3Jtcy5wdXNoKG5ldyBQbGF0Zm9ybSgodGhpcy5wbGF5ZXIucG9zaXRpb24ueCAtIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRpZmZpY3VsdHlMZXZlbC5yYW5nZSkpKSwgMTAsIDEwMCwgMjApKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb24ueCA8PSAxNTApIHtcbiAgICAgICAgdGhpcy5wbGF0Zm9ybXMucHVzaChuZXcgUGxhdGZvcm0oKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArIHRoaXMucGxheWVyLnBvc2l0aW9uLngpLCAxMCwgMTAwLCAyMCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGF0Zm9ybXMucHVzaChuZXcgUGxhdGZvcm0oKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArICh0aGlzLnBsYXllci5wb3NpdGlvbi54IC0gdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyKSksIDEwLCAxMDAsIDIwKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnBsYXRmb3Jtcy5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZURpZmZpY3VsdHkoKSB7XG4gICAgaWYgKHRoaXMuc2NvcmUgPiA0MCkge1xuICAgICAgdGhpcy5kaWZmaWN1bHR5TGV2ZWwucmFuZ2UgPSA0MDA7XG4gICAgICB0aGlzLmRpZmZpY3VsdHlMZXZlbC5jZW50ZXIgPSAyMDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNjb3JlID4gNjApIHtcbiAgICAgIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlID0gNjAwO1xuICAgICAgdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyID0gMzAwO1xuICAgIH1cbiAgfVxuXG4gIGdhbWVPdmVyKGN0eCkge1xuICAgIHRoaXMucGxheWVyLmZsb29ySGl0KHRoaXMuZ2FtZVNpemUsIGN0eCk7XG4gIH1cbiAgICBcbn1cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcbiAgICBcbiAgICBcbiAgICBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvR2FtZS5qcyIsImNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL0dhbWUuanMnKTtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMucG9zaXRpb24gPSB7IHg6IHgsIHk6IHkgfTtcbiAgICB0aGlzLnNpemUgPSB7IHc6IHdpZHRoLCBoOiBoZWlnaHQgfTtcbiAgICB0aGlzLnNwZWVkID0geyB4OiAwICwgeTogMCB9O1xuICAgIHRoaXMuZ3Jhdml0eSA9IDA7XG4gICAgdGhpcy5ncmF2aXR5U3BlZWQgPSAwO1xuICB9XG5cbiAgbW92ZW1lbnQoKSB7XG4gICAgdGhpcy5ncmF2aXR5U3BlZWQgKz0gdGhpcy5ncmF2aXR5O1xuICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLnNwZWVkLnggKiAwLjM7XG4gICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMuc3BlZWQueSArIHRoaXMuZ3Jhdml0eVNwZWVkO1xuICB9XG5cbiAgYWNjZWxlcmF0ZShzcGVlZCwgZ3Jhdml0eSwgc3BlZWRYKSB7ICBcbiAgICB0aGlzLnNwZWVkLnkgPSBzcGVlZDtcbiAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xuICB9XG5cbiAgZmxvb3JIaXQoZ2FtZVNpemUsIGN0eCkge1xuICAgIGNvbnN0IGZsb29yID0gZ2FtZVNpemUuaGVpZ2h0IC0gdGhpcy5zaXplLmg7XG4gICAgY29uc3QgZ2FtZU92ZXJJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGdhbWVPdmVySW1hZ2Uuc3JjID0gJy4vLi4vaW1hZ2VzL2dhbWVvdmVycGl6emEucG5nJztcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPiBmbG9vcikge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGdhbWVTaXplLndpZHRoLCBnYW1lU2l6ZS5oZWlnaHQpO1xuICAgICAgICBjdHguZHJhd0ltYWdlKGdhbWVPdmVySW1hZ2UsIDAsIDApO1xuICAgICAgICB0aGlzLnNwZWVkLnkgPSAwO1xuICAgICAgfVxuICB9XG5cbiAgd2FsbEhpdChnYW1lU2l6ZSkge1xuICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPiBnYW1lU2l6ZS53aWR0aCkgeyBcbiAgICAgIHRoaXMucG9zaXRpb24ueCA9IDA7IFxuICAgIH1cbiAgICBpZiAodGhpcy5wb3NpdGlvbi54IDwgMCkgeyBcbiAgICAgIHRoaXMucG9zaXRpb24ueCA9IChnYW1lU2l6ZS53aWR0aCAtIHRoaXMuc2l6ZS53KSBcbiAgICB9XG4gIH1cblxuICBtb3ZlTGVmdCgpIHsgXG4gICAgICBpZiAodGhpcy5zcGVlZC54ID49IC0yMCkge1xuICAgICAgICB0aGlzLnNwZWVkLnggKz0gLTU7XG4gICAgICB9XG4gIH07XG4gICAgXG4gIG1vdmVSaWdodCgpIHtcbiAgICBpZiAodGhpcy5zcGVlZC54IDw9IDIwKSB7XG4gICAgICB0aGlzLnNwZWVkLnggKz0gNTtcbiAgICB9XG4gIH07XG5cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGxheWVyLmpzIiwiY2xhc3MgUGxhdGZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgeDogeCwgeTogeSB9O1xuICAgICAgICB0aGlzLnNpemUgPSB7IHc6IHdpZHRoLCBoOiBoZWlnaHQgfTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IDA7XG4gICAgICAgIHRoaXMuZ3Jhdml0eVNwZWVkID0gMDtcbiAgICB9XG5cbiAgICBtb3ZlbWVudCgpIHtcbiAgICAgICAgdGhpcy5ncmF2aXR5U3BlZWQgKz0gdGhpcy5ncmF2aXR5O1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy5zcGVlZCArIHRoaXMuZ3Jhdml0eVNwZWVkO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuZ3Jhdml0eVNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IDA7XG4gICAgfVxuICAgIFxuICAgIGFjY2VsZXJhdGUoc3BlZWQsIGdyYXZpdHkpIHtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgICAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF0Zm9ybTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGxhdGZvcm0uanMiXSwic291cmNlUm9vdCI6IiJ9