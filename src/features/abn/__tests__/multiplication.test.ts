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
    expect(partials[0].expression).toMatch(/23/);
    expect(r.abnGrid?.kind).toBe('multiplication-matrix');
  });

  it('handles factor zero', () => {
    const r = generateAbnMultiplicationSteps(12, 0);
    expect(r.result).toBe(0);
  });

  it('emits one partial-product step per multiplicand part when multiplier is a single place-value part (rejilla 3 col)', () => {
    const r = generateAbnMultiplicationSteps(47, 8);
    expect(r.result).toBe(376);
    expect(r.abnGrid?.kind).toBe('multiplication-3col');
    if (r.abnGrid?.kind !== 'multiplication-3col') return;
    const partials = r.steps.filter((s) => s.kind === 'partial-product');
    expect(partials.length).toBe(r.abnGrid.multiplicandParts.length);
    expect(partials[0].title).toContain('40');
    expect(partials[1].title).toContain('7');
  });
});
