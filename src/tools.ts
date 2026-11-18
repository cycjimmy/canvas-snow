import { isString } from '@cycjimmy/awesome-js-funcs/judgeBasic'

export type DistanceInput = number | string

/**
 * handleDistanceNum
 * @param num A number, a numeric string, or a percentage string.
 * @param totalDistance The container size the percentage refers to.
 */
export function handleDistanceNum(num: DistanceInput, totalDistance: number): number {
  if (isString(num) && num.includes('%')) {
    return (Number(num.split('%')[0]) / 100) * totalDistance
  }

  return isString(num)
    ? Number(num)
    : num
}

/**
 * Measures `el` on the requested axis. An unknown `tip` returns the whole rect,
 * which is what the original implementation fell back to.
 */
export function getTotalDistance(options: { el: Element, tip: 'horizontal' }): number
export function getTotalDistance(options: { el: Element, tip: 'vertical' }): number
export function getTotalDistance(options: { el: Element, tip?: string }): number | DOMRect
export function getTotalDistance({
  el,
  tip = 'horizontal',
}: {
  el: Element
  tip?: string
}): number | DOMRect {
  switch (tip) {
    case 'horizontal':
      return el.getBoundingClientRect().width

    case 'vertical':
      return el.getBoundingClientRect().height

    default:
      return el.getBoundingClientRect()
  }
}

/**
 * getVerticalDistance
 * @param el The measured container.
 * @param num A number, a numeric string, or a percentage string.
 */
export function getVerticalDistance(el: Element, num: DistanceInput): number {
  return handleDistanceNum(num, getTotalDistance({
    el,
    tip: 'vertical',
  }))
}

/**
 * getHorizontalDistance
 * @param el The measured container.
 * @param num A number, a numeric string, or a percentage string.
 */
export function getHorizontalDistance(el: Element, num: DistanceInput): number {
  return handleDistanceNum(num, getTotalDistance({
    el,
    tip: 'horizontal',
  }))
}
