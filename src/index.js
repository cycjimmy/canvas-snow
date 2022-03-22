import isString from '@cycjimmy/awesome-js-funcs/esm/judgeBasic/isString';

import Snow from './Snow';
import SnowList from './SnowList';

/**
 * _handleDistanceNum
 * @param num
 * @param totalDistance
 * @returns {number|*|number}
 * @private
 */
const _handleDistanceNum = (num, totalDistance) => {
  if (num.toString().indexOf('%') !== -1) {
    return (num.split('%')[0] / 100) * totalDistance;
  }
  return isString(num) ? Number(num) : num;
};

/**
 * _getTotalDistance
 * @param el
 * @param tip
 * @returns {number|DOMRect}
 * @private
 */
const _getTotalDistance = ({
  el,
  tip = 'horizontal',
}) => {
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
 * _getVerticalDistance
 * @param el
 * @param num
 * @returns {number|*}
 * @private
 */
const _getVerticalDistance = (el, num) => _handleDistanceNum(num, _getTotalDistance({
  el,
  tip: 'vertical',
}));

/**
 * _getHorizontalDistance
 * @param el
 * @param num
 * @returns {number|*}
 * @private
 */
const _getHorizontalDistance = (el, num) => _handleDistanceNum(num, _getTotalDistance({
  el,
  tip: 'horizontal',
}));

export default class {
  constructor({
    context,
    width = '100%',
    height = '100%',
    cell,
  }) {
    this.context = isString(context)
      ? document.querySelector(context)
      : context;
    this.width = _getHorizontalDistance(this.context, width);
    this.height = _getVerticalDistance(this.context, height);
    this.cell = cell;
    this.state = 'stop';

    this.snowList = null;

    this.canvas = null;
    this.cxt = null;

    this.interval = null;
  }

  init() {
    if (!this.canvas) {
      this._initCanvas();
    }

    if (!this.snowList) {
      this.snowList = new SnowList();
      this._newSnow();
    }

    return this;
  }

  _initCanvas() {
    this.canvas = document.createElement('canvas');
    this.context.appendChild(this.canvas);
    this.canvas.height = this.height;
    this.canvas.width = this.width;

    this.cxt = this.canvas.getContext('2d');
  }

  /**
   * animation start
   */
  start() {
    if (!this.snowList) {
      this.init();
    }

    this.state = 'play';
    this.interval = setInterval(() => {
      this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.snowList.update();
      this.snowList.draw(this.cxt);
    }, 13);
  }

  /**
   * animation stop
   */
  stop() {
    this.state = 'stop';
    clearInterval(this.interval);
    this.interval = null;
    this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * clear
   */
  clear() {
    this.stop();
    this.snowList = null;
  }

  _newSnow() {
    for (let i = 0; i < this.cell; i += 1) {
      const
        randomX = this._getRandom('x');
      const randomY = this._getRandom('y');
      const randomR = this._getRandom('r');
      const randomFnx = this._getRandom('fnx');
      const randomFny = this._getRandom('fny');
      const snow = new Snow(randomX, randomY, randomR, {
        x: randomFnx,
        y: randomFny,
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
  _getRandom(option) {
    let ret;
    let
      random;
    switch (option) {
      case 'x':
        ret = Math.random() * this.width;
        break;
      case 'y':
        ret = (Math.random() - 1) * this.height;
        break;
      case 'r':
        ret = 2 + (Math.random() * 4);
        break;
      case 'fnx':
        random = 27 + Math.random() * 100;
        ret = (x, y) => x + 0.5 * Math.sin(y / random);
        break;

      case 'fny':
        random = 0.4 + Math.random() * 1.4;
        ret = (x, y) => y + random;
        break;
      default:
    }
    return ret;
  }
}
