(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CanvasSnow = factory());
})(this, (function () { 'use strict';

  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  /**
   * determine a string type
   * @param str
   * @returns {boolean}
   */
  var isString = (str => typeof str === 'string' && str.constructor === String);

  var _default$2 = /*#__PURE__*/function () {
    function _default(x, y, radius, fn, canvasW, canvasH) {
      _classCallCheck(this, _default);
      this.x = x;
      this.y = y;
      this.r = radius;
      this.fn = fn;
      this.canvasW = canvasW;
      this.canvasH = canvasH;
    }
    return _createClass(_default, [{
      key: "update",
      value: function update() {
        if (this.y > this.canvasH) {
          this.x = Math.random() * this.canvasW;
          this.y = 0;
        } else {
          this.x = this.fn.x(this.x, this.y);
          this.y = this.fn.y(this.y, this.y);
        }
      }
    }, {
      key: "draw",
      value: function draw(cxt) {
        var insideCxt = cxt;
        var grd = insideCxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, "rgba(255, 255, 255, ".concat(this.r / 6, ")"));
        grd.addColorStop(0.5, "rgba(255, 255, 255, ".concat(this.r / 6 * 0.5, ")"));
        grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
        insideCxt.fillStyle = grd;
        insideCxt.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
      }
    }]);
  }();

  var _default$1 = /*#__PURE__*/function () {
    function _default() {
      _classCallCheck(this, _default);
      this.list = [];
    }
    return _createClass(_default, [{
      key: "update",
      value: function update() {
        for (var i = 0, len = this.size(); i < len; i += 1) {
          this.list[i].update();
        }
      }
    }, {
      key: "push",
      value: function push(snow) {
        this.list.push(snow);
      }
    }, {
      key: "draw",
      value: function draw(cxt) {
        for (var i = 0, len = this.size(); i < len; i += 1) {
          this.list[i].draw(cxt);
        }
      }
    }, {
      key: "get",
      value: function get(index) {
        return this.list[index];
      }
    }, {
      key: "size",
      value: function size() {
        return this.list.length;
      }
    }]);
  }();

  /**
   * handleDistanceNum
   * @param num
   * @param totalDistance
   * @returns {number|*|number}
   */
  var handleDistanceNum = function handleDistanceNum(num, totalDistance) {
    if (num.toString().indexOf('%') !== -1) {
      return num.split('%')[0] / 100 * totalDistance;
    }
    return isString(num) ? Number(num) : num;
  };

  /**
   * getTotalDistance
   * @param el
   * @param tip
   * @returns {number|DOMRect}
   */
  var getTotalDistance = function getTotalDistance(_ref) {
    var el = _ref.el,
      _ref$tip = _ref.tip,
      tip = _ref$tip === void 0 ? 'horizontal' : _ref$tip;
    switch (tip) {
      case 'horizontal':
        return el.getBoundingClientRect().width;
      case 'vertical':
        return el.getBoundingClientRect().height;
      default:
        return el.getBoundingClientRect();
    }
  };

  /**
   * getVerticalDistance
   * @param el
   * @param num
   * @returns {number|*}
   */
  var getVerticalDistance = function getVerticalDistance(el, num) {
    return handleDistanceNum(num, getTotalDistance({
      el: el,
      tip: 'vertical'
    }));
  };

  /**
   * getHorizontalDistance
   * @param el
   * @param num
   * @returns {number|*}
   */
  var getHorizontalDistance = function getHorizontalDistance(el, num) {
    return handleDistanceNum(num, getTotalDistance({
      el: el,
      tip: 'horizontal'
    }));
  };

  var _default = /*#__PURE__*/function () {
    function _default(_ref) {
      var context = _ref.context,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? '100%' : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? '100%' : _ref$height,
        cell = _ref.cell;
      _classCallCheck(this, _default);
      this.context = isString(context) ? document.querySelector(context) : context;
      this.width = getHorizontalDistance(this.context, width);
      this.height = getVerticalDistance(this.context, height);
      this.cell = cell;
      this.state = 'stop';
      this.snowList = null;
      this.canvas = null;
      this.cxt = null;
      this.interval = null;
    }
    return _createClass(_default, [{
      key: "init",
      value: function init() {
        if (!this.canvas) {
          this._initCanvas();
        }
        if (!this.snowList) {
          this.snowList = new _default$1();
          this._newSnow();
        }
        return this;
      }
    }, {
      key: "_initCanvas",
      value: function _initCanvas() {
        this.canvas = document.createElement('canvas');
        this.context.appendChild(this.canvas);
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.cxt = this.canvas.getContext('2d');
      }

      /**
       * animation start
       */
    }, {
      key: "start",
      value: function start() {
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
      }

      /**
       * animation stop
       */
    }, {
      key: "stop",
      value: function stop() {
        this.state = 'stop';
        clearInterval(this.interval);
        this.interval = null;
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      /**
       * clear
       */
    }, {
      key: "clear",
      value: function clear() {
        this.stop();
        this.snowList = null;
      }
    }, {
      key: "_newSnow",
      value: function _newSnow() {
        for (var i = 0; i < this.cell; i += 1) {
          var randomX = this._getRandom('x');
          var randomY = this._getRandom('y');
          var randomR = this._getRandom('r');
          var randomFnx = this._getRandom('fnx');
          var randomFny = this._getRandom('fny');
          var snow = new _default$2(randomX, randomY, randomR, {
            x: randomFnx,
            y: randomFny
          }, this.width, this.height);
          snow.draw(this.cxt);
          this.snowList.push(snow);
        }
      }

      /**
       * Generate random x-pos, y-pos or fn functions
       * @param  {string} option x|y|fnx|fny
       * @return {int|Function}
       */
    }, {
      key: "_getRandom",
      value: function _getRandom(option) {
        var ret;
        var random;
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
      }
    }]);
  }();

  return _default;

}));
