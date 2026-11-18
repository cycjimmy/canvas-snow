import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  getBoundingClientRectMockReturn,
  mockGetBoundingClientRect,
} from '../__mocks__/getBoundingClientRectMock'
import {
  getHorizontalDistance,
  getTotalDistance,
  getVerticalDistance,
  handleDistanceNum,
} from '../src/tools'

describe('tools', () => {
  let blockEl: HTMLDivElement

  beforeEach(() => {
    mockGetBoundingClientRect()
    blockEl = document.createElement('div')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('handles numbers, numeric strings and percentages', () => {
    expect(handleDistanceNum(100, 1000)).toBe(100)
    expect(handleDistanceNum('100', 1000)).toBe(100)
    expect(handleDistanceNum('10%', 1000)).toBe(100)
  })

  it('measures the requested axis of the container', () => {
    expect(getTotalDistance({ el: blockEl }))
      .toBe(getBoundingClientRectMockReturn.width)

    expect(getTotalDistance({ el: blockEl, tip: 'horizontal' }))
      .toBe(getBoundingClientRectMockReturn.width)

    expect(getTotalDistance({ el: blockEl, tip: 'vertical' }))
      .toBe(getBoundingClientRectMockReturn.height)

    expect(getTotalDistance({ el: blockEl, tip: 'someOther' }))
      .toEqual(getBoundingClientRectMockReturn)
  })

  it('resolves vertical and horizontal distances', () => {
    expect(getVerticalDistance(blockEl, '10%'))
      .toBe(getBoundingClientRectMockReturn.height * 0.1)

    expect(getHorizontalDistance(blockEl, '10%'))
      .toBe(getBoundingClientRectMockReturn.width * 0.1)
  })
})
