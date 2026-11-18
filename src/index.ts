import type { SnowMotion } from './Snow.js'

import { isString } from '@cycjimmy/awesome-js-funcs/judgeBasic'

import Snow from './Snow.js'
import SnowList from './SnowList.js'
import { getHorizontalDistance, getVerticalDistance } from './tools.js'

export interface CanvasSnowOptions {
  /** The wrapper element, or a selector matching it. */
  context: Element | string
  /** Canvas width as a number, a numeric string, or a percentage string. */
  width?: number | string
  /** Canvas height as a number, a numeric string, or a percentage string. */
  height?: number | string
  /** The number of snowflakes to generate. */
  cell: number
}

export type CanvasSnowState = 'stop' | 'play'

export default class CanvasSnow {
  context: Element
  width: number
  height: number
  cell: number
  state: CanvasSnowState
  snowList: SnowList | null
  canvas: HTMLCanvasElement | null
  cxt: CanvasRenderingContext2D | null
  interval: ReturnType<typeof setInterval> | null

  constructor({ context, width = '100%', height = '100%', cell }: CanvasSnowOptions) {
    const target = isString(context)
      ? document.querySelector(context)
      : context
    if (!target) {
      throw new Error(`CanvasSnow could not find the element matching "${String(context)}".`)
    }

    this.context = target
    this.width = getHorizontalDistance(this.context, width)
    this.height = getVerticalDistance(this.context, height)
    this.cell = cell
    this.state = 'stop'

    this.snowList = null

    this.canvas = null
    this.cxt = null

    this.interval = null
  }

  init(): this {
    if (!this.canvas) {
      this.initCanvas()
    }

    if (!this.snowList) {
      this.snowList = new SnowList()
      this.newSnow()
    }

    return this
  }

  /**
   * animation start
   */
  start(): void {
    if (!this.snowList) {
      this.init()
    }

    const { cxt, canvas, snowList } = this
    if (!cxt || !canvas || !snowList) {
      throw new Error('CanvasSnow must be initialized before it can start.')
    }

    this.state = 'play'
    this.interval = setInterval(() => {
      cxt.clearRect(0, 0, canvas.width, canvas.height)
      snowList.update()
      snowList.draw(cxt)
    }, 13)
  }

  /**
   * animation stop
   */
  stop(): void {
    this.state = 'stop'

    if (this.interval !== null) {
      clearInterval(this.interval)
      this.interval = null
    }

    const { cxt, canvas } = this
    if (!cxt || !canvas) {
      throw new Error('CanvasSnow must be initialized before it can stop.')
    }

    cxt.clearRect(0, 0, canvas.width, canvas.height)
  }

  /**
   * clear
   */
  clear(): void {
    this.stop()
    this.snowList = null
  }

  private initCanvas(): void {
    const canvas = document.createElement('canvas')
    this.canvas = canvas
    this.context.appendChild(canvas)
    canvas.height = this.height
    canvas.width = this.width

    const cxt = canvas.getContext('2d')
    if (!cxt) {
      throw new Error('CanvasSnow could not acquire a 2D canvas context.')
    }

    this.cxt = cxt
  }

  private newSnow(): void {
    const { snowList, cxt } = this
    if (!snowList || !cxt) {
      throw new Error('CanvasSnow must be initialized before snow can be generated.')
    }

    for (let i = 0; i < this.cell; i += 1) {
      const randomX = this.getRandom('x')
      const randomY = this.getRandom('y')
      const randomR = this.getRandom('r')
      const randomFnx = this.getRandom('fnx')
      const randomFny = this.getRandom('fny')
      const snow = new Snow(randomX, randomY, randomR, {
        x: randomFnx,
        y: randomFny,
      }, this.width, this.height)
      snow.draw(cxt)
      snowList.push(snow)
    }
  }

  /**
   * Generate random x-pos, y-pos or fn functions
   * @param option x|y|r|fnx|fny
   */
  private getRandom(option: 'x' | 'y' | 'r'): number
  private getRandom(option: 'fnx' | 'fny'): SnowMotion['x']
  private getRandom(option: string): number | SnowMotion['x'] | undefined
  private getRandom(option: string): number | SnowMotion['x'] | undefined {
    let ret: number | SnowMotion['x'] | undefined
    let random: number

    switch (option) {
      case 'x':
        ret = Math.random() * this.width
        break
      case 'y':
        ret = (Math.random() - 1) * this.height
        break
      case 'r':
        ret = 2 + (Math.random() * 4)
        break
      case 'fnx':
        random = 27 + Math.random() * 100
        ret = (x, y) => x + 0.5 * Math.sin(y / random)
        break

      case 'fny':
        random = 0.4 + Math.random() * 1.4
        ret = (_x, y) => y + random
        break
      default:
    }

    return ret
  }
}
