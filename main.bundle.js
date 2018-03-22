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
	var game = new Game(gameSize);
	console.log(game.player.x);
	
	function gameLoop() {
	  game.update();
	  game.draw(ctx);
	  game.gameOver(ctx);
	  $score.text(game.score);
	  requestAnimationFrame(gameLoop);
	  displayGameScoreboardOnLoss();
	  displayFlamesOnGameStart();
	}
	
	function drawStartScreen() {
	  var gameStartImg = new Image();
	  gameStartImg.src = './images/startscreen.png';
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ctx.drawImage(gameStartImg, 0, 0);
	  if (game.score === 0) {
	    requestAnimationFrame(drawStartScreen);
	  }
	}
	
	drawStartScreen();
	
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
	
	var $score = $('#score');
	var $oldScores = $('#past-scores');
	var $userName = $('#user-name');
	var $submitBtn = $('#submit-name');
	var $hiddenPlayer = $('.hidden-player');
	var $hiddenForm = $('.hidden-form');
	var $flames = $('#flame-container');
	
	$submitBtn.on('click', saveUser);
	pullLocalStorage();
	
	function displayGameScoreboardOnLoss() {
	  if (game.player.position.y > gameSize.height) {
	    $hiddenPlayer.attr("style", "visibility: visible");
	    $hiddenForm.attr("style", "visibility: visible");
	  }
	}
	
	function displayFlamesOnGameStart() {
	  if (game.score > 2) {
	    $flames.attr("style", "visibility: visible");
	  }
	}
	
	function saveUser(event) {
	  event.preventDefault();
	  var userNameVal = $userName.val();
	  var player = { name: userNameVal, score: game.score };
	  prependUser(player);
	  toLocalStorage(player);
	}
	
	function prependUser(player) {
	  $oldScores.prepend('<li>' + player.name + ': ' + player.score + '</li>');
	}
	
	function toLocalStorage(player) {
	  var key = Date.now();
	  localStorage.setItem(key, JSON.stringify(player));
	}
	
	function pullLocalStorage() {
	  for (var i = 0; i < localStorage.length; i++) {
	    var storedScores = JSON.parse(localStorage.getItem(localStorage.key(i)));
	    prependUser(storedScores);
	  };
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = __webpack_require__(2);
	var Platform = __webpack_require__(4);
	
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
	      this.player.floorHit(this.gameSize);
	      this.platforms.forEach(function (platform) {
	        return platform.movement();
	      });
	      this.collisionDetection();
	      this.removeExtraPlatform();
	      this.updateDifficulty();
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      var playerImage = new Image();
	      var platformImage = new Image();
	      platformImage.src = './images/breadstick.png';
	      playerImage.src = './images/pizzadude.png';
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
	      this.platforms.forEach(function (platform) {
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
	      }
	    }
	  }, {
	    key: 'removeExtraPlatform',
	    value: function removeExtraPlatform() {
	      if (this.platforms.length > 8) {
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
	      var floor = this.gameSize.height - this.player.size.h;
	      var gameOverImage = new Image();
	      gameOverImage.src = './images/gameoverpizza.png';
	      if (this.player.position.y > floor) {
	        ctx.clearRect(0, 0, this.gameSize.width, this.gameSize.height);
	        ctx.drawImage(gameOverImage, 0, 0);
	      }
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
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Gamepieces = __webpack_require__(3);
	
	var Player = function (_Gamepieces) {
	  _inherits(Player, _Gamepieces);
	
	  function Player(x, y, width, height) {
	    _classCallCheck(this, Player);
	
	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, width, height));
	
	    _this.speed = { x: 0, y: 0 };
	    return _this;
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
	    value: function accelerate(speed, gravity) {
	      this.speed.y = speed;
	      this.gravity = gravity;
	    }
	  }, {
	    key: 'floorHit',
	    value: function floorHit(gameSize) {
	      var floor = gameSize.height - this.size.h;
	      if (this.position.y > floor) {
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
	}(Gamepieces);
	
	module.exports = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gamepieces = function Gamepieces(x, y, width, height) {
	    _classCallCheck(this, Gamepieces);
	
	    this.position = { x: x, y: y };
	    this.size = { w: width, h: height };
	    this.gravity = 0;
	    this.gravitySpeed = 0;
	};
	
	module.exports = Gamepieces;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Gamepieces = __webpack_require__(3);
	
	var Platform = function (_Gamepieces) {
	  _inherits(Platform, _Gamepieces);
	
	  function Platform(x, y, width, height) {
	    _classCallCheck(this, Platform);
	
	    var _this = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, x, y, width, height));
	
	    _this.speed = 0;
	    return _this;
	  }
	
	  _createClass(Platform, [{
	    key: 'movement',
	    value: function movement() {
	      this.gravitySpeed += this.gravity;
	      this.position.y += this.speed + this.gravitySpeed;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.gravitySpeed = 0;
	      this.speed = 0;
	      this.gravity = 0;
	    }
	  }, {
	    key: 'accelerate',
	    value: function accelerate(speed, gravity) {
	      this.speed = speed;
	      this.gravity = gravity;
	    }
	  }]);
	
	  return Platform;
	}(Gamepieces);
	
	module.exports = Platform;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmNkMDNhNmYzMDFkY2RmOWI5MWIiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0dhbWVwaWVjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL1BsYXRmb3JtLmpzIl0sIm5hbWVzIjpbIkF1ZGlvIiwicGxheSIsIkdhbWUiLCJyZXF1aXJlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJnYW1lU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiZ2FtZSIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXIiLCJ4IiwiZ2FtZUxvb3AiLCJ1cGRhdGUiLCJkcmF3IiwiZ2FtZU92ZXIiLCIkc2NvcmUiLCJ0ZXh0Iiwic2NvcmUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkaXNwbGF5R2FtZVNjb3JlYm9hcmRPbkxvc3MiLCJkaXNwbGF5RmxhbWVzT25HYW1lU3RhcnQiLCJkcmF3U3RhcnRTY3JlZW4iLCJnYW1lU3RhcnRJbWciLCJJbWFnZSIsInNyYyIsImNsZWFyUmVjdCIsImRyYXdJbWFnZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImtleUNvZGUiLCJtb3ZlTGVmdCIsImFjY2VsZXJhdGUiLCJtb3ZlUmlnaHQiLCJwb3NpdGlvbiIsInkiLCJsb2NhdGlvbiIsInJlbG9hZCIsIiQiLCIkb2xkU2NvcmVzIiwiJHVzZXJOYW1lIiwiJHN1Ym1pdEJ0biIsIiRoaWRkZW5QbGF5ZXIiLCIkaGlkZGVuRm9ybSIsIiRmbGFtZXMiLCJvbiIsInNhdmVVc2VyIiwicHVsbExvY2FsU3RvcmFnZSIsImF0dHIiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJOYW1lVmFsIiwidmFsIiwibmFtZSIsInByZXBlbmRVc2VyIiwidG9Mb2NhbFN0b3JhZ2UiLCJwcmVwZW5kIiwia2V5IiwiRGF0ZSIsIm5vdyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiaSIsImxlbmd0aCIsInN0b3JlZFNjb3JlcyIsInBhcnNlIiwiZ2V0SXRlbSIsIlBsYXllciIsIlBsYXRmb3JtIiwiZGlmZmljdWx0eUxldmVsIiwicmFuZ2UiLCJjZW50ZXIiLCJzdGFydFBsYXRmb3JtIiwicGxhdGZvcm1zIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibW92ZW1lbnQiLCJ3YWxsSGl0IiwiZmxvb3JIaXQiLCJmb3JFYWNoIiwicGxhdGZvcm0iLCJjb2xsaXNpb25EZXRlY3Rpb24iLCJyZW1vdmVFeHRyYVBsYXRmb3JtIiwidXBkYXRlRGlmZmljdWx0eSIsInBsYXllckltYWdlIiwicGxhdGZvcm1JbWFnZSIsImZpbGxSZWN0Iiwic2l6ZSIsInciLCJoIiwiaGl0IiwiZ3Jhdml0eVNwZWVkIiwidXBkYXRlUGxhdGZvcm1BcnIiLCJzdG9wIiwicHVzaCIsInNoaWZ0IiwiZ2FtZU92ZXJJbWFnZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJHYW1lcGllY2VzIiwic3BlZWQiLCJncmF2aXR5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQUlBLEtBQUosQ0FBVSwrQ0FBVixFQUEyREMsSUFBM0Q7O0FBRUEsS0FBTUMsT0FBTyxtQkFBQUMsQ0FBUSxDQUFSLENBQWI7QUFDQSxLQUFNQyxTQUFTQyxTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxLQUFNQyxNQUFNSCxPQUFPSSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFDQSxLQUFN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QSxhQUFhLG1CQUFBeEcsQ0FBUSxDQUFSLENBQW5COztLQUVNd0UsUTs7O0FBQ0oscUJBQVkzRCxDQUFaLEVBQWV5QixDQUFmLEVBQWtCL0IsS0FBbEIsRUFBeUJDLE1BQXpCLEVBQWlDO0FBQUE7O0FBQUEscUhBQ3pCSyxDQUR5QixFQUN0QnlCLENBRHNCLEVBQ25CL0IsS0FEbUIsRUFDWkMsTUFEWTs7QUFFL0IsV0FBS2lHLEtBQUwsR0FBYSxDQUFiO0FBRitCO0FBR2hDOzs7O2dDQUVVO0FBQ1QsWUFBS1QsWUFBTCxJQUFxQixLQUFLVSxPQUExQjtBQUNBLFlBQUtyRSxRQUFMLENBQWNDLENBQWQsSUFBbUIsS0FBS21FLEtBQUwsR0FBYSxLQUFLVCxZQUFyQztBQUNEOzs7NEJBRU07QUFDTCxZQUFLQSxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsWUFBS1MsS0FBTCxHQUFhLENBQWI7QUFDQSxZQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNEOzs7Z0NBRVVELEssRUFBT0MsTyxFQUFTO0FBQ3pCLFlBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLFlBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNEOzs7O0dBcEJvQkYsVTs7QUF1QnZCRixRQUFPQyxPQUFQLEdBQWlCL0IsUUFBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZjZDAzYTZmMzAxZGNkZjliOTFiIiwibmV3IEF1ZGlvKCcvc291bmRzL1BJWlpBIEFMRVJUIC0gT1JJR0lOQUwgOC1CSVQgU09ORy5tcDMnKS5wbGF5KCk7XG5cbmNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL0dhbWUuanMnKTtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW4nKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOyAgXG5jb25zdCBnYW1lU2l6ZSA9IHsgd2lkdGg6IGNhbnZhcy53aWR0aCwgaGVpZ2h0OiBjYW52YXMuaGVpZ2h0IH07XG5jb25zdCBnYW1lID0gbmV3IEdhbWUoZ2FtZVNpemUpO1xuY29uc29sZS5sb2coZ2FtZS5wbGF5ZXIueClcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGdhbWUudXBkYXRlKCk7XG4gIGdhbWUuZHJhdyhjdHgpO1xuICBnYW1lLmdhbWVPdmVyKGN0eCk7XG4gICRzY29yZS50ZXh0KGdhbWUuc2NvcmUpO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICBkaXNwbGF5R2FtZVNjb3JlYm9hcmRPbkxvc3MoKTtcbiAgZGlzcGxheUZsYW1lc09uR2FtZVN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdTdGFydFNjcmVlbigpIHsgXG4gIGNvbnN0IGdhbWVTdGFydEltZyA9IG5ldyBJbWFnZSgpO1xuICBnYW1lU3RhcnRJbWcuc3JjID0gJy4vaW1hZ2VzL3N0YXJ0c2NyZWVuLnBuZyc7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgY3R4LmRyYXdJbWFnZShnYW1lU3RhcnRJbWcsIDAsIDApO1xuICBpZiAoZ2FtZS5zY29yZSA9PT0gMCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3U3RhcnRTY3JlZW4pO1xuICB9XG59XG5cbmRyYXdTdGFydFNjcmVlbigpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgIGNhc2UgMzc6IC8vIExlZnRcbiAgICBnYW1lLnBsYXllci5tb3ZlTGVmdCgpO1xuICAgIGJyZWFrO1xuICAgIFxuICAgIGNhc2UgMzI6IC8vIFVwXG4gICAgZ2FtZS5wbGF5ZXIuYWNjZWxlcmF0ZSgtNywgLjIpO1xuICAgIGJyZWFrO1xuICAgIFxuICAgIGNhc2UgMzk6IC8vIFJpZ2h0XG4gICAgZ2FtZS5wbGF5ZXIubW92ZVJpZ2h0KCk7XG4gICAgYnJlYWs7XG4gICAgXG4gICAgY2FzZSAxMzogLy8gRW50ZXJcbiAgICBpZiAoZ2FtZS5wbGF5ZXIucG9zaXRpb24ueSA+IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cblxuICAgIGdhbWVMb29wKCk7ICAgIFxuICAgIGJyZWFrO1xuICB9XG59LCBmYWxzZSk7XG5cblxuY29uc3QgJHNjb3JlID0gJCgnI3Njb3JlJyk7XG5jb25zdCAkb2xkU2NvcmVzID0gJCgnI3Bhc3Qtc2NvcmVzJyk7XG5jb25zdCAkdXNlck5hbWUgPSAkKCcjdXNlci1uYW1lJyk7XG5jb25zdCAkc3VibWl0QnRuID0gJCgnI3N1Ym1pdC1uYW1lJyk7XG5jb25zdCAkaGlkZGVuUGxheWVyID0gJCgnLmhpZGRlbi1wbGF5ZXInKTtcbmNvbnN0ICRoaWRkZW5Gb3JtID0gJCgnLmhpZGRlbi1mb3JtJyk7XG5jb25zdCAkZmxhbWVzID0gJCgnI2ZsYW1lLWNvbnRhaW5lcicpO1xuXG4kc3VibWl0QnRuLm9uKCdjbGljaycsIHNhdmVVc2VyKTtcbnB1bGxMb2NhbFN0b3JhZ2UoKTtcblxuZnVuY3Rpb24gZGlzcGxheUdhbWVTY29yZWJvYXJkT25Mb3NzKCkge1xuICBpZiAoZ2FtZS5wbGF5ZXIucG9zaXRpb24ueSA+IGdhbWVTaXplLmhlaWdodCkge1xuICAgICRoaWRkZW5QbGF5ZXIuYXR0cihcInN0eWxlXCIsIFwidmlzaWJpbGl0eTogdmlzaWJsZVwiKTtcbiAgICAkaGlkZGVuRm9ybS5hdHRyKFwic3R5bGVcIiwgXCJ2aXNpYmlsaXR5OiB2aXNpYmxlXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlGbGFtZXNPbkdhbWVTdGFydCgpIHtcbiAgaWYgKGdhbWUuc2NvcmUgPiAyKSB7XG4gICAgJGZsYW1lcy5hdHRyKFwic3R5bGVcIiwgXCJ2aXNpYmlsaXR5OiB2aXNpYmxlXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhdmVVc2VyKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHVzZXJOYW1lVmFsID0gJHVzZXJOYW1lLnZhbCgpO1xuICBjb25zdCBwbGF5ZXIgPSB7bmFtZTogdXNlck5hbWVWYWwsIHNjb3JlOiBnYW1lLnNjb3JlfTtcbiAgcHJlcGVuZFVzZXIocGxheWVyKTtcbiAgdG9Mb2NhbFN0b3JhZ2UocGxheWVyKTtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFVzZXIocGxheWVyKSB7XG4gICRvbGRTY29yZXMucHJlcGVuZChgPGxpPiR7cGxheWVyLm5hbWV9OiAke3BsYXllci5zY29yZX08L2xpPmApO1xufVxuXG5mdW5jdGlvbiB0b0xvY2FsU3RvcmFnZShwbGF5ZXIpIHtcbiAgY29uc3Qga2V5ID0gRGF0ZS5ub3coKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShwbGF5ZXIpKTtcbn1cblxuZnVuY3Rpb24gcHVsbExvY2FsU3RvcmFnZSgpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzdG9yZWRTY29yZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZS5rZXkoaSkpKTtcbiAgICBwcmVwZW5kVXNlcihzdG9yZWRTY29yZXMpO1xuICB9O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5kZXguanMiLCJjb25zdCBQbGF5ZXIgPSByZXF1aXJlKCcuL1BsYXllci5qcycpO1xuY29uc3QgUGxhdGZvcm0gPSByZXF1aXJlKCcuL1BsYXRmb3JtLmpzJyk7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihnYW1lU2l6ZSkge1xuICAgIHRoaXMuZ2FtZVNpemUgPSBnYW1lU2l6ZTtcbiAgICB0aGlzLmRpZmZpY3VsdHlMZXZlbCA9IHtyYW5nZTogMzAwLCBjZW50ZXI6IDE1MH07XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5zdGFydFBsYXRmb3JtID0gbmV3IFBsYXRmb3JtKDAsIGdhbWVTaXplLmhlaWdodCAtIDE1LCBnYW1lU2l6ZS53aWR0aCwgMTUpXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuZ2FtZVNpemUud2lkdGggLyAyLCB0aGlzLmdhbWVTaXplLmhlaWdodCAtIDc1LCA2MCwgNjApXG4gICAgdGhpcy5wbGF0Zm9ybXMgPSBbbmV3IFBsYXRmb3JtICgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kaWZmaWN1bHR5TGV2ZWwucmFuZ2UpICsgKHRoaXMucGxheWVyLnBvc2l0aW9uLnggLSB0aGlzLmRpZmZpY3VsdHlMZXZlbC5jZW50ZXIpKSwgdGhpcy5nYW1lU2l6ZS5oZWlnaHQgLSAxMjUsIDEwMCwgMTUpLCBcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgUGxhdGZvcm0gKChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRpZmZpY3VsdHlMZXZlbC5yYW5nZSkgKyAodGhpcy5wbGF5ZXIucG9zaXRpb24ueCAtIHRoaXMuZGlmZmljdWx0eUxldmVsLmNlbnRlcikpLCB0aGlzLmdhbWVTaXplLmhlaWdodCAtIDI1MCwgMTAwLCAyMCksIFxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBQbGF0Zm9ybSAoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArICh0aGlzLnBsYXllci5wb3NpdGlvbi54IC0gdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyKSksIHRoaXMuZ2FtZVNpemUuaGVpZ2h0IC0gMzc1LCAxMDAsIDIwKSxcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgUGxhdGZvcm0gKChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRpZmZpY3VsdHlMZXZlbC5yYW5nZSkgKyAodGhpcy5wbGF5ZXIucG9zaXRpb24ueCAtIHRoaXMuZGlmZmljdWx0eUxldmVsLmNlbnRlcikpLCB0aGlzLmdhbWVTaXplLmhlaWdodCAtIDUwMCwgMTAwLCAyMCksXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IFBsYXRmb3JtICgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kaWZmaWN1bHR5TGV2ZWwucmFuZ2UpICsgKHRoaXMucGxheWVyLnBvc2l0aW9uLnggLSB0aGlzLmRpZmZpY3VsdHlMZXZlbC5jZW50ZXIpKSwgdGhpcy5nYW1lU2l6ZS5oZWlnaHQgLSA2MjUsIDEwMCwgMjApLFxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBQbGF0Zm9ybSAoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArICh0aGlzLnBsYXllci5wb3NpdGlvbi54IC0gdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyKSksIHRoaXMuZ2FtZVNpemUuaGVpZ2h0IC0gNzUwLCAxMDAsIDIwKSxcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgUGxhdGZvcm0gKChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRpZmZpY3VsdHlMZXZlbC5yYW5nZSkgKyAodGhpcy5wbGF5ZXIucG9zaXRpb24ueCAtIHRoaXMuZGlmZmljdWx0eUxldmVsLmNlbnRlcikpLCB0aGlzLmdhbWVTaXplLmhlaWdodCAtIDgyNSwgMTAwLCAyMCksXG4gICAgICAgICAgICAgICAgICAgICAgbmV3IFBsYXRmb3JtICgoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kaWZmaWN1bHR5TGV2ZWwucmFuZ2UpICsgKHRoaXMucGxheWVyLnBvc2l0aW9uLnggLSB0aGlzLmRpZmZpY3VsdHlMZXZlbC5jZW50ZXIpKSwgdGhpcy5nYW1lU2l6ZS5oZWlnaHQgLSA5NTAsIDEwMCwgMjApXTtcbiAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgdXBkYXRlKCkge1xuICAgIHRoaXMucGxheWVyLm1vdmVtZW50KCk7XG4gICAgdGhpcy5wbGF5ZXIud2FsbEhpdCh0aGlzLmdhbWVTaXplKTtcbiAgICB0aGlzLnBsYXllci5mbG9vckhpdCh0aGlzLmdhbWVTaXplKTtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKCBwbGF0Zm9ybSA9PiBwbGF0Zm9ybS5tb3ZlbWVudCgpKTsgICBcbiAgICB0aGlzLmNvbGxpc2lvbkRldGVjdGlvbigpO1xuICAgIHRoaXMucmVtb3ZlRXh0cmFQbGF0Zm9ybSgpO1xuICAgIHRoaXMudXBkYXRlRGlmZmljdWx0eSgpO1xuICB9XG4gIFxuICBcbiAgZHJhdyhjdHgpIHtcbiAgICBjb25zdCBwbGF5ZXJJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGNvbnN0IHBsYXRmb3JtSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBwbGF0Zm9ybUltYWdlLnNyYyA9ICcuL2ltYWdlcy9icmVhZHN0aWNrLnBuZyc7XG4gICAgcGxheWVySW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3BpenphZHVkZS5wbmcnO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5nYW1lU2l6ZS53aWR0aCwgdGhpcy5nYW1lU2l6ZS5oZWlnaHQpO1xuICAgIGN0eC5kcmF3SW1hZ2UocGxheWVySW1hZ2UsIHRoaXMucGxheWVyLnBvc2l0aW9uLngsIHRoaXMucGxheWVyLnBvc2l0aW9uLnkpO1xuICAgIHRoaXMucGxhdGZvcm1zLmZvckVhY2ggKCBwbGF0Zm9ybSA9PiBjdHguZHJhd0ltYWdlKHBsYXRmb3JtSW1hZ2UsIHBsYXRmb3JtLnBvc2l0aW9uLngsIHBsYXRmb3JtLnBvc2l0aW9uLnkpKVxuICAgIGN0eC5maWxsUmVjdCh0aGlzLnN0YXJ0UGxhdGZvcm0ucG9zaXRpb24ueCwgXG4gICAgICB0aGlzLnN0YXJ0UGxhdGZvcm0ucG9zaXRpb24ueSwgXG4gICAgICB0aGlzLnN0YXJ0UGxhdGZvcm0uc2l6ZS53LCBcbiAgICAgIHRoaXMuc3RhcnRQbGF0Zm9ybS5zaXplLmgpO1xuICAgIH1cbiAgICBcbiAgY29sbGlzaW9uRGV0ZWN0aW9uKCkgeyBcbiAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLnBsYXllcjtcbiAgICB0aGlzLnBsYXRmb3Jtcy5mb3JFYWNoKCBwbGF0Zm9ybSA9PiB7XG4gICAgICBpZiAocGxheWVyLnBvc2l0aW9uLnggKyBwbGF5ZXIuc2l6ZS53ID49IHBsYXRmb3JtLnBvc2l0aW9uLnggJiYgXG4gICAgICAgIHBsYXllci5wb3NpdGlvbi54IDw9IHBsYXRmb3JtLnBvc2l0aW9uLnggKyBwbGF0Zm9ybS5zaXplLncgJiYgXG4gICAgICAgIHBsYXllci5wb3NpdGlvbi55ICsgcGxheWVyLnNpemUuaCA+PSBwbGF0Zm9ybS5wb3NpdGlvbi55ICYmICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHBsYXllci5wb3NpdGlvbi55ICsgcGxheWVyLnNpemUuaCA8IHBsYXRmb3JtLnBvc2l0aW9uLnkgKyBwbGF0Zm9ybS5zaXplLmgpIHtcbiAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBcbiAgaGl0KCkge1xuICAgIG5ldyBBdWRpbygnL3NvdW5kcy9zZnhfbW92ZW1lbnRfanVtcDE3LndhdicpLnBsYXkoKTtcbiAgICB0aGlzLnBsYXllci5ncmF2aXR5U3BlZWQgPSAwOyBcbiAgICB0aGlzLnNjb3JlKys7XG4gICAgdGhpcy51cGRhdGVQbGF0Zm9ybUFycigpO1xuICAgIHRoaXMucGxhdGZvcm1zLmZvckVhY2goIHBsYXRmb3JtID0+IHBsYXRmb3JtLnN0b3AoKSk7XG4gICAgdGhpcy5wbGF0Zm9ybXMuZm9yRWFjaCggcGxhdGZvcm0gPT4gcGxhdGZvcm0uYWNjZWxlcmF0ZSg2LCAtMC4xKSk7XG4gIH1cbiAgXG4gIHVwZGF0ZVBsYXRmb3JtQXJyKCkge1xuICAgIGlmICh0aGlzLnBsYXRmb3Jtc1t0aGlzLnBsYXRmb3Jtcy5sZW5ndGggLSAxXS5wb3NpdGlvbi55ID4gODApIHtcbiAgICAgIGlmICh0aGlzLnBsYXllci5wb3NpdGlvbi54ID49IDY1MCkge1xuICAgICAgICB0aGlzLnBsYXRmb3Jtcy5wdXNoKG5ldyBQbGF0Zm9ybSgodGhpcy5wbGF5ZXIucG9zaXRpb24ueCAtIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRpZmZpY3VsdHlMZXZlbC5yYW5nZSkpKSwgMTAsIDEwMCwgMjApKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb24ueCA8PSAxNTApIHtcbiAgICAgICAgdGhpcy5wbGF0Zm9ybXMucHVzaChuZXcgUGxhdGZvcm0oKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArIHRoaXMucGxheWVyLnBvc2l0aW9uLngpLCAxMCwgMTAwLCAyMCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGF0Zm9ybXMucHVzaChuZXcgUGxhdGZvcm0oKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlKSArICh0aGlzLnBsYXllci5wb3NpdGlvbi54IC0gdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyKSksIDEwLCAxMDAsIDIwKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gICAgXG4gIHJlbW92ZUV4dHJhUGxhdGZvcm0oKSB7XG4gICAgaWYgKHRoaXMucGxhdGZvcm1zLmxlbmd0aCA+IDgpIHtcbiAgICAgIHRoaXMucGxhdGZvcm1zLnNoaWZ0KCk7XG4gICAgfSBcbiAgfVxuXG4gIHVwZGF0ZURpZmZpY3VsdHkoKSB7XG4gICAgaWYgKHRoaXMuc2NvcmUgPiA0MCkge1xuICAgICAgdGhpcy5kaWZmaWN1bHR5TGV2ZWwucmFuZ2UgPSA0MDA7XG4gICAgICB0aGlzLmRpZmZpY3VsdHlMZXZlbC5jZW50ZXIgPSAyMDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNjb3JlID4gNjApIHtcbiAgICAgIHRoaXMuZGlmZmljdWx0eUxldmVsLnJhbmdlID0gNjAwO1xuICAgICAgdGhpcy5kaWZmaWN1bHR5TGV2ZWwuY2VudGVyID0gMzAwO1xuICAgIH1cbiAgfVxuXG4gIGdhbWVPdmVyKGN0eCkge1xuICAgIGNvbnN0IGZsb29yID0gdGhpcy5nYW1lU2l6ZS5oZWlnaHQgLSB0aGlzLnBsYXllci5zaXplLmg7XG4gICAgY29uc3QgZ2FtZU92ZXJJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGdhbWVPdmVySW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL2dhbWVvdmVycGl6emEucG5nJztcbiAgICBpZiAodGhpcy5wbGF5ZXIucG9zaXRpb24ueSA+IGZsb29yKSB7XG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2FtZVNpemUud2lkdGgsIHRoaXMuZ2FtZVNpemUuaGVpZ2h0KTtcbiAgICAgIGN0eC5kcmF3SW1hZ2UoZ2FtZU92ZXJJbWFnZSwgMCwgMCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZVxuICAgIFxuICAgIFxuICAgIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY29uc3QgR2FtZXBpZWNlcyA9IHJlcXVpcmUoJy4vR2FtZXBpZWNlcy5qcycpXG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEdhbWVwaWVjZXMge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5zcGVlZCA9IHsgeDogMCwgeTogMCB9O1xuICB9XG5cbiAgbW92ZW1lbnQoKSB7XG4gICAgdGhpcy5ncmF2aXR5U3BlZWQgKz0gdGhpcy5ncmF2aXR5O1xuICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLnNwZWVkLnggKiAwLjM7XG4gICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMuc3BlZWQueSArIHRoaXMuZ3Jhdml0eVNwZWVkO1xuICB9XG5cbiAgYWNjZWxlcmF0ZShzcGVlZCwgZ3Jhdml0eSkgeyAgXG4gICAgdGhpcy5zcGVlZC55ID0gc3BlZWQ7XG4gICAgdGhpcy5ncmF2aXR5ID0gZ3Jhdml0eTtcbiAgfVxuXG4gIGZsb29ySGl0KGdhbWVTaXplKSB7XG4gICAgY29uc3QgZmxvb3IgPSBnYW1lU2l6ZS5oZWlnaHQgLSB0aGlzLnNpemUuaDtcbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPiBmbG9vcikge1xuICAgICAgICB0aGlzLnNwZWVkLnkgPSAwO1xuICAgICAgfVxuICB9XG5cbiAgd2FsbEhpdChnYW1lU2l6ZSkge1xuICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPiBnYW1lU2l6ZS53aWR0aCkgeyBcbiAgICAgIHRoaXMucG9zaXRpb24ueCA9IDA7IFxuICAgIH1cbiAgICBpZiAodGhpcy5wb3NpdGlvbi54IDwgMCkgeyBcbiAgICAgIHRoaXMucG9zaXRpb24ueCA9IChnYW1lU2l6ZS53aWR0aCAtIHRoaXMuc2l6ZS53KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlTGVmdCgpIHsgXG4gICAgICBpZiAodGhpcy5zcGVlZC54ID49IC0yMCkge1xuICAgICAgICB0aGlzLnNwZWVkLnggKz0gLTU7XG4gICAgICB9XG4gIH1cbiAgICBcbiAgbW92ZVJpZ2h0KCkge1xuICAgIGlmICh0aGlzLnNwZWVkLnggPD0gMjApIHtcbiAgICAgIHRoaXMuc3BlZWQueCArPSA1O1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1BsYXllci5qcyIsImNsYXNzIEdhbWVwaWVjZXMge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHsgeCwgeSB9O1xuICAgICAgICB0aGlzLnNpemUgPSB7IHc6IHdpZHRoLCBoOiBoZWlnaHQgfTtcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gMDtcbiAgICAgICAgdGhpcy5ncmF2aXR5U3BlZWQgPSAwO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lcGllY2VzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0dhbWVwaWVjZXMuanMiLCJjb25zdCBHYW1lcGllY2VzID0gcmVxdWlyZSgnLi9HYW1lcGllY2VzLmpzJylcblxuY2xhc3MgUGxhdGZvcm0gZXh0ZW5kcyBHYW1lcGllY2VzIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQpOyAgICBcbiAgICB0aGlzLnNwZWVkID0gMDtcbiAgfVxuXG4gIG1vdmVtZW50KCkge1xuICAgIHRoaXMuZ3Jhdml0eVNwZWVkICs9IHRoaXMuZ3Jhdml0eTtcbiAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy5zcGVlZCArIHRoaXMuZ3Jhdml0eVNwZWVkO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmdyYXZpdHlTcGVlZCA9IDA7XG4gICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgdGhpcy5ncmF2aXR5ID0gMDtcbiAgfVxuICBcbiAgYWNjZWxlcmF0ZShzcGVlZCwgZ3Jhdml0eSkge1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmdyYXZpdHkgPSBncmF2aXR5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGxhdGZvcm07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL1BsYXRmb3JtLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==