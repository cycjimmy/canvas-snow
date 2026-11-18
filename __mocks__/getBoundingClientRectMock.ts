import { vi } from 'vitest'

export const getBoundingClientRectMockReturn = {
  width: 100,
  height: 200,
  top: 0,
  left: 0,
  bottom: 200,
  right: 100,
  x: 0,
  y: 0,
  toJSON: () => ({}),
}

/**
 * jsdom reports an empty rect for every element, which would make every distance
 * zero. The sizes below are what the assertions in `tools.test.ts` expect.
 */
export function mockGetBoundingClientRect(): void {
  vi.spyOn(Element.prototype, 'getBoundingClientRect')
    .mockReturnValue(getBoundingClientRectMockReturn)
}
