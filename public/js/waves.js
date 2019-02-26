/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/waves.js":
/*!**************************************!*\
  !*** ./resources/assets/js/waves.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.Waves = function Waves(config) {
  for (var _len = arguments.length, waveConfigs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    waveConfigs[_key - 1] = arguments[_key];
  }

  var canvas = document.getElementById(config.canvas);
  var context = canvas.getContext('2d');
  var waves = [];
  var scale = 1 / (config.scale || 0.5);
  var width = canvas.width = window.innerHeight * scale;
  var height = canvas.height = window.innerHeight * scale;
  var nodes = config.waveCount || 5;
  var backgroundColor = config.backgroundColor || 'white';
  var backgroundBlendMode = config.backgroundBlendMode || 'source-over';
  var waveBlendMode = config.waveBlendMode || 'screen';

  var resize = function resize() {
    width = canvas.width = window.innerHeight * scale;
    height = canvas.height = window.innerHeight * scale;
    update();
  };

  window.addEventListener('resize', resize);

  var init = function init() {
    for (var i = 0; i < 3; i++) {
      createWave(waveConfigs[i].color, nodes);
    }

    setInterval(update, 10);
  };

  var createWave = function createWave(color, nodes) {
    var nodeArray = [];

    for (var i = 0; i <= nodes + 2; i++) {
      var node = [(i - 1) * width / nodes, 0, Math.random() * 200, 0.3];
      nodeArray.push(node);
    }

    waves.push({
      color: color,
      nodes: nodeArray
    });
  };

  var update = function update() {
    context.fillStyle = backgroundColor;
    context.globalCompositeOperation = backgroundBlendMode;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = waveBlendMode;

    for (var i = 0; i < waves.length; i++) {
      for (var j = 0; j < waves[i].nodes.length; j++) {
        bounce(waves[i].nodes[j], waveConfigs[i].amplitude || 35);
      }

      drawWave(waves[i]);
    }
  };

  var bounce = function bounce(node, amplitude) {
    node[1] = amplitude * Math.sin(node[2] / 20) + height / 2;
    node[2] = node[2] + node[3];
  };

  var diff = function diff(a, b) {
    return (b - a) / 2 + a;
  };

  var drawWave = function drawWave(wave) {
    context.fillStyle = wave.color;
    context.beginPath();
    context.moveTo(0, height);
    context.lineTo(wave.nodes[0][0], wave.nodes[0][1]);

    for (var i = 0; i < wave.nodes.length; i++) {
      if (wave.nodes[i + 1]) {
        context.quadraticCurveTo(wave.nodes[i][0], wave.nodes[i][1], diff(wave.nodes[i][0], wave.nodes[i + 1][0]), diff(wave.nodes[i][1], wave.nodes[i + 1][1]));
      } else {
        context.lineTo(wave.nodes[i][0], wave.nodes[i][1]);
        context.lineTo(width, height);
      }
    }

    context.closePath();
    context.fill();
  };

  init();
};

/***/ }),

/***/ 2:
/*!********************************************!*\
  !*** multi ./resources/assets/js/waves.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\code\v4\resources\assets\js\waves.js */"./resources/assets/js/waves.js");


/***/ })

/******/ });