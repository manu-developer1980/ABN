import { describe, expect, it } from 'vitest';
import { generateAbnAdditionSteps } from '../addition';

describe('generateAbnAdditionSteps', () => {
  it('computes 348 + 276', () => {
    const r = generateAbnAdditionSteps(348, 276);
    expect(r.result).toBe(624);
    expect(r.operation).toBe('addition');
    expect(r.operands).toEqual([348, 276]);
  });

  it('includes decomposition and accumulation steps', () => {
    const r = generateAbnAdditionSteps(348, 276);
    const kinds = r.steps.map((s) => s.kind);
    expect(kinds[0]).toBe('decomposition');
    expect(kinds.filter((k) => k === 'accumulation')).toHaveLength(3);
    expect(kinds[kinds.length - 1]).toBe('result');
  });

  it('handles second summand zero', () => {
    const r = generateAbnAdditionSteps(42, 0);
    expect(r.result).toBe(42);
    expect(r.steps.some((s) => s.expression.includes('0'))).toBe(true);
  });

  it('handles zeros in decomposition (304 + 10)', () => {
    const r = generateAbnAdditionSteps(304, 10);
    expect(r.result).toBe(314);
    const accum = r.steps.filter((s) => s.kind === 'accumulation');
    expect(accum).toHaveLength(1);
    expect(accum[0].afterValue).toBe(314);
  });

  it('throws for negative operands', () => {
    expect(() => generateAbnAdditionSteps(-1, 2)).toThrow(RangeError);
    expect(() => generateAbnAdditionSteps(1, -2)).toThrow(RangeError);
  });

  it('produces five steps for 348 + 276 (decompose + 3 accumulations + result)', () => {
    const r = generateAbnAdditionSteps(348, 276);
    expect(r.steps).toHaveLength(5);
  });
});
