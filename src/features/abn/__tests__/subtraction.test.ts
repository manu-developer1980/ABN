import { describe, expect, it } from 'vitest';
import { generateAbnSubtractionSteps } from '../subtraction';

describe('generateAbnSubtractionSteps', () => {
  it('computes 523 − 287', () => {
    const r = generateAbnSubtractionSteps(523, 287);
    expect(r.result).toBe(236);
    expect(r.operation).toBe('subtraction');
    expect(r.operands).toEqual([523, 287]);
    expect(r.abnGrid?.kind).toBe('subtraction-parallel');
  });

  it('ends with minuend equal to the difference', () => {
    const r = generateAbnSubtractionSteps(523, 287);
    const parallels = r.steps.filter((s) => s.kind === 'subtraction-parallel');
    expect(parallels.length).toBeGreaterThan(0);
    const last = parallels[parallels.length - 1];
    expect(last.afterValue).toBe(236);
  });

  it('handles difference zero', () => {
    const r = generateAbnSubtractionSteps(10, 10);
    expect(r.result).toBe(0);
    expect(r.steps.some((s) => s.kind === 'result')).toBe(true);
  });

  it('throws when minuend < subtrahend', () => {
    expect(() => generateAbnSubtractionSteps(3, 5)).toThrow(RangeError);
  });

  it('builds parallel grid for 65 − 28', () => {
    const r = generateAbnSubtractionSteps(65, 28);
    expect(r.result).toBe(37);
    if (r.abnGrid?.kind === 'subtraction-parallel') {
      expect(r.abnGrid.chunks.reduce((s, c) => s + c, 0)).toBe(28);
      const last = r.abnGrid.rows[r.abnGrid.rows.length - 1];
      expect(last.minuendAfter).toBe(37);
      expect(last.subtrahendAfter).toBe(0);
    }
  });
});
