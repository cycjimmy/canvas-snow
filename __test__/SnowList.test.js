/* eslint no-undef: off */
import CanvasSnow from '../src/index';
import Snow from '../src/Snow';
import SnowList from '../src/SnowList';

describe('SnowList test', () => {
  const snowWrapper = document.createElement('div');
  snowWrapper.style.width = '360px';
  snowWrapper.style.height = '640px';

  const canvasSnow = new CanvasSnow({
    context: snowWrapper,
    cell: 1,
  }).init();

  test('snowList default test', () => {
    const snowList = new SnowList();
    expect(snowList.list).toEqual([]);
  });

  test('snowList functions test', () => {
    const snowList = new SnowList();
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
    snowList.push(snow);
    snowList.draw(canvasSnow.cxt);
    snowList.update();

    expect(snowList.get(0)).toEqual(snow);
    expect(snowList.size()).toBe(1);
  });
});
