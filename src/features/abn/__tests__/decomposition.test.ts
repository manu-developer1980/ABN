import { describe, expect, it } from 'vitest';
import {
  decomposeAscendingByPlaceValue,
  decomposeByPlaceValue,
} from '../decomposition';

describe('decomposeByPlaceValue', () => {
  it('decomposes 276 into hundreds, tens, ones', () => {
    expect(decomposeByPlaceValue(276)).toEqual([200, 70, 6]);
  });

  it('omits zero places (304)', () => {
    expect(decomposeByPlaceValue(304)).toEqual([300, 4]);
  });

  it('handles thousands with inner zeros (1005)', () => {
    expect(decomposeByPlaceValue(1005)).toEqual([1000, 5]);
  });

  it('returns [0] for zero', () => {
    expect(decomposeByPlaceValue(0)).toEqual([0]);
  });

  it('throws for negative numbers', () => {
    expect(() => decomposeByPlaceValue(-1)).toThrow(RangeError);
  });
});

describe('decomposeAscendingByPlaceValue', () => {
  it('orders 12 as units then tens', () => {
    expect(decomposeAscendingByPlaceValue(12)).toEqual([2, 10]);
  });
});
