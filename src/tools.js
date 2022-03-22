import isString from '@cycjimmy/awesome-js-funcs/esm/judgeBasic/isString';

/**
 * handleDistanceNum
 * @param num
 * @param totalDistance
 * @returns {number|*|number}
 */
export const handleDistanceNum = (num, totalDistance) => {
  if (num.toString().indexOf('%') !== -1) {
    return (num.split('%')[0] / 100) * totalDistance;
  }
  return isString(num) ? Number(num) : num;
};

/**
 * getTotalDistance
 * @param el
 * @param tip
 * @returns {number|DOMRect}
 */
export const getTotalDistance = ({
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
 * getVerticalDistance
 * @param el
 * @param num
 * @returns {number|*}
 */
export const getVerticalDistance = (el, num) => handleDistanceNum(num, getTotalDistance({
  el,
  tip: 'vertical',
}));

/**
 * getHorizontalDistance
 * @param el
 * @param num
 * @returns {number|*}
 */
export const getHorizontalDistance = (el, num) => handleDistanceNum(num, getTotalDistance({
  el,
  tip: 'horizontal',
}));
