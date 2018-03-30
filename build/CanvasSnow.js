(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CanvasSnow"] = factory();
	else
		root["CanvasSnow"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_awesome_js_funcs_judgeBasic_isString__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Snow__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SnowList__ = __webpack_require__(3);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var CanvasSnow = function () {
  function CanvasSnow(_ref) {
    var context = _ref.context,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? '100%' : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? '100%' : _ref$height,
        cell = _ref.cell;

    _classCallCheck(this, CanvasSnow);

    this.context = Object(__WEBPACK_IMPORTED_MODULE_0_awesome_js_funcs_judgeBasic_isString__["a" /* default */])(context) ? document.querySelector(context) : context;
    this.width = _getHorizontalDistance(this.context, width);
    this.height = _getVerticalDistance(this.context, height);
    this.cell = cell;
    this.state = 'stop';

    this.snowList = null;

    this.canvas = null;
    this.cxt = null;

    this.interval = null;
  }

  CanvasSnow.prototype.init = function init() {
    if (!this.canvas) {
      this._initCanvas();
    }

    if (!this.snowList) {
      this.snowList = new __WEBPACK_IMPORTED_MODULE_2__SnowList__["a" /* default */]();
      this._newSnow();
    }

    return this;
  };

  CanvasSnow.prototype._initCanvas = function _initCanvas() {
    this.canvas = document.createElement('canvas');
    this.context.appendChild(this.canvas);
    this.canvas.height = this.height;
    this.canvas.width = this.width;

    this.cxt = this.canvas.getContext('2d');
  };

  /**
   * animation start
   */
  CanvasSnow.prototype.start = function start() {
    var _this = this;

    if (!this.snowList) {
      this.init();
    }

    this.state = 'play';
    this.interval = setInterval(function () {
      _this.cxt.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
      _this.snowList.update();
      _this.snowList.draw(_this.cxt);
    }, 13);
  };

  /**
   * animation stop
   */
  CanvasSnow.prototype.stop = function stop() {
    this.state = 'stop';
    clearInterval(this.interval);
    this.interval = null;
    this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  /**
   *
   */
  CanvasSnow.prototype.clear = function clear() {
    this.stop();
    this.snowList = null;
  };

  CanvasSnow.prototype._newSnow = function _newSnow() {
    for (var i = 0; i < this.cell; i++) {
      var randomX = this._getRandom('x'),
          randomY = this._getRandom('y'),
          randomR = this._getRandom('r'),
          randomFnx = this._getRandom('fnx'),
          randomFny = this._getRandom('fny'),
          snow = new __WEBPACK_IMPORTED_MODULE_1__Snow__["a" /* default */](randomX, randomY, randomR, {
        x: randomFnx,
        y: randomFny
      }, this.width, this.height);
      snow.draw(this.cxt);
      this.snowList.push(snow);
    }
  };

  /**
   * Generate random x-pos, y-pos or fn functions
   * @param  {string} option x|y|fnx|fny
   * @return {int|Function}
   */
  CanvasSnow.prototype._getRandom = function _getRandom(option) {
    var ret = void 0,
        random = void 0;
    switch (option) {
      case 'x':
        ret = Math.random() * this.width;
        break;
      case 'y':
        ret = (Math.random() - 1) * this.height;
        break;
      case 'r':
        ret = 2 + Math.random() * 4;
        break;
      case 'fnx':
        random = 27 + Math.random() * 100;
        ret = function ret(x, y) {
          return x + 0.5 * Math.sin(y / random);
        };
        break;

      case 'fny':
        random = 0.4 + Math.random() * 1.4;
        ret = function ret(x, y) {
          return y + random;
        };
        break;
    }
    return ret;
  };

  return CanvasSnow;
}();

/* harmony default export */ __webpack_exports__["default"] = (CanvasSnow);
;

// private
var _handleDistanceNum = function _handleDistanceNum(num, totalDistance) {
  if (num.toString().indexOf('%') !== -1) {
    return num.split('%')[0] / 100 * totalDistance;
  }
  return Object(__WEBPACK_IMPORTED_MODULE_0_awesome_js_funcs_judgeBasic_isString__["a" /* default */])(num) ? Number(num) : num;
},
    _getTotalDistance = function _getTotalDistance(_ref2) {
  var el = _ref2.el,
      _ref2$tip = _ref2.tip,
      tip = _ref2$tip === undefined ? 'horizontal' : _ref2$tip;

  switch (tip) {
    case 'horizontal':
      return el.getBoundingClientRect().width;

    case 'vertical':
      return el.getBoundingClientRect().height;

    default:
      return el.getBoundingClientRect();
  }
},
    _getVerticalDistance = function _getVerticalDistance(el, num) {
  return _handleDistanceNum(num, _getTotalDistance({
    el: el,
    tip: 'vertical'
  }));
},
    _getHorizontalDistance = function _getHorizontalDistance(el, num) {
  return _handleDistanceNum(num, _getTotalDistance({
    el: el,
    tip: 'horizontal'
  }));
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 判断是否字符串
 * @param str
 * @returns {boolean}
 */
/* harmony default export */ __webpack_exports__["a"] = (function (str) {
  return typeof str === 'string' && str.constructor === String;
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(x, y, radius, fn, canvasW, canvasH) {
    _classCallCheck(this, _class);

    this.x = x;
    this.y = y;
    this.r = radius;
    this.fn = fn;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
  }

  _class.prototype.update = function update() {
    if (this.y > this.canvasH) {
      this.x = Math.random() * this.canvasW;
      this.y = 0;
    } else {
      this.x = this.fn.x(this.x, this.y);
      this.y = this.fn.y(this.y, this.y);
    }
  };

  _class.prototype.draw = function draw(cxt) {
    var grd = cxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    grd.addColorStop(0, 'rgba(255, 255, 255, ' + this.r / 6 * 1 + ')');
    grd.addColorStop(.5, 'rgba(255, 255, 255, ' + this.r / 6 * .5 + ')');
    grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
    cxt.fillStyle = grd;
    cxt.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
  };

  return _class;
}();

/* harmony default export */ __webpack_exports__["a"] = (_class);
;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.list = [];
  }

  _class.prototype.update = function update() {
    for (var i = 0, len = this.size(); i < len; i++) {
      this.list[i].update();
    }
  };

  _class.prototype.push = function push(snow) {
    this.list.push(snow);
  };

  _class.prototype.draw = function draw(cxt) {
    for (var i = 0, len = this.size(); i < len; i++) {
      this.list[i].draw(cxt);
    }
  };

  _class.prototype.get = function get(index) {
    return this.list[index];
  };

  _class.prototype.size = function size() {
    return this.list.length;
  };

  return _class;
}();

/* harmony default export */ __webpack_exports__["a"] = (_class);
;

/***/ })
/******/ ])["default"];
});