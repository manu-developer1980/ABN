import { describe, expect, it } from 'vitest';
import { generateAbnMultiplicationSteps } from '../multiplication';

describe('generateAbnMultiplicationSteps', () => {
  it('computes 23 × 14', () => {
    const r = generateAbnMultiplicationSteps(23, 14);
    expect(r.result).toBe(322);
    expect(r.operation).toBe('multiplication');
  });

  it('includes partial-product steps', () => {
    const r = generateAbnMultiplicationSteps(23, 14);
    const partials = r.steps.filter((s) => s.kind === 'partial-product');
    expect(partials.length).toBeGreaterThanOrEqual(2);
    expect(partials[0].meta?.multiplicationFragment).toBeDefined();
  });

  it('handles factor zero', () => {
    const r = generateAbnMultiplicationSteps(12, 0);
    expect(r.result).toBe(0);
  });
});
