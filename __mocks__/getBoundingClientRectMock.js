import { jest } from '@jest/globals';

export const getBoundingClientRectMockReturn = {
  width: 100,
  height: 200,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export const mockFn = () => {
  Element.prototype.getBoundingClientRect = jest.fn(() => getBoundingClientRectMockReturn);
};
