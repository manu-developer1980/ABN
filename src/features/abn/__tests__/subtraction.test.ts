import { describe, expect, it } from 'vitest';
import { generateAbnSubtractionSteps } from '../subtraction';

describe('generateAbnSubtractionSteps', () => {
  it('computes 523 − 287', () => {
    const r = generateAbnSubtractionSteps(523, 287);
    expect(r.result).toBe(236);
    expect(r.operation).toBe('subtraction');
    expect(r.operands).toEqual([523, 287]);
  });

  it('ends at minuend after jumps', () => {
    const r = generateAbnSubtractionSteps(523, 287);
    const jumps = r.steps.filter((s) => s.kind === 'subtraction-jump');
    expect(jumps.length).toBeGreaterThan(0);
    const lastJump = jumps[jumps.length - 1];
    expect(lastJump.afterValue).toBe(523);
  });

  it('handles difference zero', () => {
    const r = generateAbnSubtractionSteps(10, 10);
    expect(r.result).toBe(0);
    expect(r.steps.some((s) => s.kind === 'result')).toBe(true);
  });

  it('throws when minuend < subtrahend', () => {
    expect(() => generateAbnSubtractionSteps(3, 5)).toThrow(RangeError);
  });
});
