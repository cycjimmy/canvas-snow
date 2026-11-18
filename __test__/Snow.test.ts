import type { MockCanvasGradient } from '../__mocks__/canvasMock'

import { describe, expect, it, vi } from 'vitest'

import { asCanvasContext, getMockContext } from '../__mocks__/canvasMock'
import Snow from '../src/Snow'

describe('snow', () => {
  it('follows the motion functions while it stays inside the canvas', () => {
    const snow = new Snow(10, 20, 3, {
      x: (x, _y) => x + 1,
      y: (_x, y) => y + 2,
    }, 100, 200)

    snow.update()

    expect(snow.x).toBe(11)
    expect(snow.y).toBe(22)
    expect(snow.canvasW).toBe(100)
    expect(snow.canvasH).toBe(200)
  })

  it('resets to the top with a new x once it passes the bottom', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const snow = new Snow(10, 201, 3, {
      x: x => x + 1,
      y: (_x, y) => y + 2,
    }, 100, 200)

    snow.update()

    expect(snow.x).toBe(50)
    expect(snow.y).toBe(0)

    vi.restoreAllMocks()
  })

  it('draws a radial gradient with three stops', () => {
    const snow = new Snow(10, 20, 6, {
      x: (x, _y) => x,
      y: (_x, y) => y,
    }, 100, 200)
    const cxt = getMockContext(document.createElement('canvas'))

    snow.draw(asCanvasContext(cxt))

    expect(cxt.createRadialGradient).toHaveBeenCalledWith(10, 20, 0, 10, 20, 6)

    const gradient = cxt.createRadialGradient.mock.results[0].value as MockCanvasGradient
    expect(gradient.addColorStop).toHaveBeenCalledTimes(3)
    expect(gradient.addColorStop).toHaveBeenNthCalledWith(1, 0, 'rgba(255, 255, 255, 1)')
    expect(gradient.addColorStop).toHaveBeenNthCalledWith(2, 0.5, 'rgba(255, 255, 255, 0.5)')
    expect(gradient.addColorStop).toHaveBeenNthCalledWith(3, 1, 'rgba(255, 255, 255, 0)')

    expect(cxt.fillRect).toHaveBeenCalledWith(4, 14, 12, 12)
    expect(cxt.fillStyle).toBe(gradient)
  })
})
