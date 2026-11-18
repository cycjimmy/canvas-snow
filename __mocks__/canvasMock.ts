import type { Mock } from 'vitest'

import { vi } from 'vitest'

export interface MockCanvasGradient {
  addColorStop: Mock
}

export interface MockCanvasContext {
  fillStyle: string | MockCanvasGradient
  clearRect: Mock
  fillRect: Mock
  createRadialGradient: Mock
}

const contexts = new WeakMap<HTMLCanvasElement, MockCanvasContext>()

function createMockCanvasContext(): MockCanvasContext {
  return {
    fillStyle: '',
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    createRadialGradient: vi.fn(() => ({
      addColorStop: vi.fn(),
    })),
  }
}

/**
 * Returns the 2D context of `canvas`, creating it on first use so the same canvas
 * always sees the same object.
 */
export function getMockContext(canvas: HTMLCanvasElement): MockCanvasContext {
  let context = contexts.get(canvas)
  if (!context) {
    context = createMockCanvasContext()
    contexts.set(canvas, context)
  }

  return context
}

/**
 * Narrows a mock context for the code under test. The cast lives here so neither
 * the sources nor the tests ever deal with a partial context type.
 */
export function asCanvasContext(context: MockCanvasContext): CanvasRenderingContext2D {
  return context as unknown as CanvasRenderingContext2D
}

/**
 * jsdom ships no canvas implementation, so `getContext('2d')` returns null and
 * CanvasSnow cannot draw at all. Replacing it keeps the test environment free of
 * a native canvas build.
 */
export function installCanvasMock(): void {
  const getContext = function getContext(this: HTMLCanvasElement): CanvasRenderingContext2D {
    return asCanvasContext(getMockContext(this))
  }

  HTMLCanvasElement.prototype.getContext = getContext as unknown as HTMLCanvasElement['getContext']
}
