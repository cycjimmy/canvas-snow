/* eslint no-undef: off */
import CanvasSnow from '../src/index';
import Snow from '../src/Snow';

describe('snow test', () => {
  const snowWrapper = document.createElement('div');
  snowWrapper.style.width = '360px';
  snowWrapper.style.height = '640px';

  const canvasSnow = new CanvasSnow({
    context: snowWrapper,
    width: 360,
    height: 640,
    cell: 1,
  }).init();

  test('snow default test', () => {
    const snow = new Snow(
      canvasSnow._getRandom('x'),
      canvasSnow._getRandom('y'),
      canvasSnow._getRandom('r'),
      {
        x: canvasSnow._getRandom('fnx'),
        y: canvasSnow._getRandom('fny'),
      },
      canvasSnow.width,
      canvasSnow.height,
    );
    snow.draw(canvasSnow.cxt);
    snow.update();

    expect(snow.canvasW).toBe(canvasSnow.width);
    expect(snow.canvasH).toBe(canvasSnow.height);
  });

  test('snow extra test', () => {
    const snow1 = new Snow(
      canvasSnow._getRandom('x'),
      200,
      canvasSnow._getRandom('r'),
      {
        x: canvasSnow._getRandom('fnx'),
        y: canvasSnow._getRandom('fny'),
      },
      canvasSnow.width,
      canvasSnow.height,
    );
    snow1.draw(canvasSnow.cxt);
    snow1.update();

    const snow2 = new Snow(
      canvasSnow._getRandom('x'),
      1000,
      canvasSnow._getRandom('r'),
      {
        x: canvasSnow._getRandom('fnx'),
        y: canvasSnow._getRandom('fny'),
      },
      canvasSnow.width,
      canvasSnow.height,
    );
    snow2.draw(canvasSnow.cxt);
    snow2.update();
  });
});
