import { installCanvasMock } from '../__mocks__/canvasMock'

// Runs before any test module is imported, because CanvasSnow draws as soon as
// `init()` is called.
installCanvasMock()
