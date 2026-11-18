import { describe, expect, it } from 'vitest'

import { asCanvasContext, getMockContext } from '../__mocks__/canvasMock'
import Snow from '../src/Snow'
import SnowList from '../src/SnowList'

function createSnow(): Snow {
  return new Snow(10, 20, 3, {
    x: (x, _y) => x + 1,
    y: (_x, y) => y + 2,
  }, 100, 200)
}

describe('snowList', () => {
  it('starts empty', () => {
    expect(new SnowList().list).toEqual([])
    expect(new SnowList().size()).toBe(0)
  })

  it('pushes, reads, draws and updates its flakes', () => {
    const snowList = new SnowList()
    const snow = createSnow()
    const cxt = getMockContext(document.createElement('canvas'))

    snowList.push(snow)
    snowList.draw(asCanvasContext(cxt))
    snowList.update()

    expect(snowList.get(0)).toBe(snow)
    expect(snowList.get(1)).toBeUndefined()
    expect(snowList.size()).toBe(1)
    expect(cxt.createRadialGradient).toHaveBeenCalledTimes(1)
    expect(snow.x).toBe(11)
    expect(snow.y).toBe(22)
  })
})
