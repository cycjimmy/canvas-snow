import CanvasSnow from '../dist/CanvasSnow';

describe('ui spec', () => {
  const
    snowWrapper = document.createElement('div')
  ;

  snowWrapper.style.width = '360px';
  snowWrapper.style.height = '640px';

  let canvasSnow = new CanvasSnow({
    context: snowWrapper,
    cell: 50
  });

  test('canvasSnow.context should be snowWrapper', () => {
    expect(canvasSnow.context).toBe(snowWrapper);
  });
});
