/* eslint no-undef: off */
import { expect, jest } from '@jest/globals';
import {
  getBoundingClientRectMockReturn,
  mockFn,
} from '../__mocks__/getBoundingClientRectMock';
import CanvasSnow from '../src/index';

describe('canvasSnow test', () => {
  // mock getBoundingClientRect()
  beforeEach(() => {
    mockFn();
    jest.spyOn(document, 'querySelector').mockImplementation(() => document.createElement('div'));
  });

  const snowWrapper = document.createElement('div');

  test('canvasSnow default test', () => {
    jest.useFakeTimers();
    const canvasSnow = new CanvasSnow({
      context: snowWrapper,
      cell: 1,
    });

    expect(canvasSnow.context).toBe(snowWrapper);
    expect(canvasSnow.width).toBe(getBoundingClientRectMockReturn.width);
    expect(canvasSnow.height).toBe(getBoundingClientRectMockReturn.height);
    expect(canvasSnow.cell).toBe(1);
    expect(canvasSnow.state).toBe('stop');
    expect(canvasSnow.snowList).toEqual(null);
    expect(canvasSnow.canvas).toEqual(null);
    expect(canvasSnow.cxt).toEqual(null);

    // cover functions
    canvasSnow.start();
    jest.advanceTimersByTime(1000);
    expect(canvasSnow.state).toBe('play');
    jest.useRealTimers();
    canvasSnow.stop();
    expect(canvasSnow.state).toBe('stop');
    canvasSnow.clear();
    expect(canvasSnow.snowList).toEqual(null);
  });

  test('coverall test', () => {
    const canvasSnow = new CanvasSnow({
      context: '#snowWrapper',
      cell: 1,
    }).init();
    canvasSnow.init();
    canvasSnow.start();

    expect(canvasSnow._getRandom('someOther')).toEqual(undefined);
  });
});
