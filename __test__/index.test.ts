import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getMockContext } from '../__mocks__/canvasMock'
import {
  getBoundingClientRectMockReturn,
  mockGetBoundingClientRect,
} from '../__mocks__/getBoundingClientRectMock'
import CanvasSnow from '../src/index'

describe('canvasSnow', () => {
  let wrapper: HTMLDivElement

  beforeEach(() => {
    mockGetBoundingClientRect()
    wrapper = document.createElement('div')
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    document.body.replaceChildren()
  })

  it('resolves the defaults and starts in the stopped state', () => {
    const canvasSnow = new CanvasSnow({ context: wrapper, cell: 1 })

    expect(canvasSnow.context).toBe(wrapper)
    expect(canvasSnow.width).toBe(getBoundingClientRectMockReturn.width)
    expect(canvasSnow.height).toBe(getBoundingClientRectMockReturn.height)
    expect(canvasSnow.cell).toBe(1)
    expect(canvasSnow.state).toBe('stop')
    expect(canvasSnow.snowList).toBeNull()
    expect(canvasSnow.canvas).toBeNull()
    expect(canvasSnow.cxt).toBeNull()
    expect(canvasSnow.interval).toBeNull()
  })

  it('accepts a selector and resolves the matching element', () => {
    const target = document.createElement('div')
    target.className = 'snow-wrapper'
    document.body.appendChild(target)

    const canvasSnow = new CanvasSnow({ context: '.snow-wrapper', cell: 1 })

    expect(canvasSnow.context).toBe(target)
  })

  it('rejects a selector that matches nothing', () => {
    expect(() => new CanvasSnow({ context: '.missing', cell: 1 }))
      .toThrow(/could not find the element matching/)
  })

  it('honours numeric and percentage sizes', () => {
    const canvasSnow = new CanvasSnow({
      context: wrapper,
      width: 360,
      height: '50%',
      cell: 1,
    })

    expect(canvasSnow.width).toBe(360)
    expect(canvasSnow.height).toBe(getBoundingClientRectMockReturn.height * 0.5)
  })

  it('appends a single canvas and generates the flakes on init()', () => {
    const canvasSnow = new CanvasSnow({ context: wrapper, cell: 3 })

    expect(canvasSnow.init()).toBe(canvasSnow)
    expect(canvasSnow.init()).toBe(canvasSnow)

    expect(wrapper.querySelectorAll('canvas')).toHaveLength(1)
    expect(canvasSnow.canvas?.width).toBe(getBoundingClientRectMockReturn.width)
    expect(canvasSnow.canvas?.height).toBe(getBoundingClientRectMockReturn.height)
    expect(canvasSnow.snowList?.size()).toBe(3)
  })

  it('initializes on demand when start() is called first', () => {
    vi.useFakeTimers()
    const canvasSnow = new CanvasSnow({ context: wrapper, cell: 1 })

    canvasSnow.start()

    expect(canvasSnow.snowList).not.toBeNull()
    expect(canvasSnow.state).toBe('play')

    canvasSnow.stop()
  })

  it('clears, updates and draws every 13ms while playing', () => {
    vi.useFakeTimers()
    const canvasSnow = new CanvasSnow({ context: wrapper, cell: 2 }).init()
    const canvas = canvasSnow.canvas as HTMLCanvasElement
    const cxt = getMockContext(canvas)
    const snowList = canvasSnow.snowList
    if (!snowList) {
      throw new Error('init() should have created the snow list')
    }

    // Spy on the frame work itself: asserting `clearRect` alone would still pass
    // with a different interval, or with a frame that stops updating or drawing.
    const update = vi.spyOn(snowList, 'update')
    const draw = vi.spyOn(snowList, 'draw')

    canvasSnow.start()
    expect(canvasSnow.state).toBe('play')
    expect(canvasSnow.interval).not.toBeNull()

    // Nothing runs before the 13ms boundary.
    vi.advanceTimersByTime(12)
    expect(cxt.clearRect).not.toHaveBeenCalled()
    expect(update).not.toHaveBeenCalled()
    expect(draw).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(cxt.clearRect).toHaveBeenCalledTimes(1)
    expect(cxt.clearRect).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height)
    expect(update).toHaveBeenCalledTimes(1)
    expect(draw).toHaveBeenCalledTimes(1)
    expect(draw).toHaveBeenCalledWith(canvasSnow.cxt)

    // One frame is clear -> update -> draw, in that order.
    expect(cxt.clearRect.mock.invocationCallOrder[0])
      .toBeLessThan(update.mock.invocationCallOrder[0])
    expect(update.mock.invocationCallOrder[0])
      .toBeLessThan(draw.mock.invocationCallOrder[0])

    // The following frame keeps the same cadence.
    vi.advanceTimersByTime(13)
    expect(cxt.clearRect).toHaveBeenCalledTimes(2)
    expect(update).toHaveBeenCalledTimes(2)
    expect(draw).toHaveBeenCalledTimes(2)

    canvasSnow.stop()
    expect(canvasSnow.state).toBe('stop')
    expect(canvasSnow.interval).toBeNull()

    cxt.clearRect.mockClear()
    update.mockClear()
    draw.mockClear()
    vi.advanceTimersByTime(100)
    expect(cxt.clearRect).not.toHaveBeenCalled()
    expect(update).not.toHaveBeenCalled()
    expect(draw).not.toHaveBeenCalled()
  })

  it('stops the animation and drops the flakes on clear()', () => {
    vi.useFakeTimers()
    const canvasSnow = new CanvasSnow({ context: wrapper, cell: 1 }).init()

    canvasSnow.start()
    canvasSnow.clear()

    expect(canvasSnow.state).toBe('stop')
    expect(canvasSnow.interval).toBeNull()
    expect(canvasSnow.snowList).toBeNull()
  })
})
