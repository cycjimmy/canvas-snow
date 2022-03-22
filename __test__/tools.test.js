/* eslint no-undef: off */
import {
  getBoundingClientRectMockReturn,
  mockFn,
} from '../__mocks__/getBoundingClientRectMock';
import {
  getHorizontalDistance, getTotalDistance, getVerticalDistance, handleDistanceNum,
} from '../src/tools';

describe('tools test', () => {
  // mock getBoundingClientRect()
  beforeEach(() => mockFn());

  test('function handleDistanceNum test', () => {
    expect(handleDistanceNum(100, 1000)).toBe(100);
    expect(handleDistanceNum('100', 1000)).toBe(100);
    expect(handleDistanceNum('10%', 1000)).toBe(100);
  });

  test('function getTotalDistance test', () => {
    const blockEl = document.createElement('div');

    expect(getTotalDistance({
      el: blockEl,
    })).toBe(getBoundingClientRectMockReturn.width);

    expect(getTotalDistance({
      el: blockEl,
      tip: 'vertical',
    })).toBe(getBoundingClientRectMockReturn.height);

    expect(getTotalDistance({
      el: blockEl,
      tip: 'someOther',
    })).toEqual(getBoundingClientRectMockReturn);
  });

  test('function getVerticalDistance test', () => {
    const blockEl = document.createElement('div');

    expect(getVerticalDistance(blockEl, '10%')).toBe(getBoundingClientRectMockReturn.height * 0.1);
  });

  test('function getHorizontalDistance test', () => {
    const blockEl = document.createElement('div');

    expect(getHorizontalDistance(blockEl, '10%')).toBe(getBoundingClientRectMockReturn.width * 0.1);
  });
});
