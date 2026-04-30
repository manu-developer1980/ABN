import { describe, expect, it } from 'vitest';
import { generateAbnDivisionSteps } from '../division';

describe('generateAbnDivisionSteps', () => {
  it('computes 156 ÷ 12 with doc-style chunks', () => {
    const r = generateAbnDivisionSteps(156, 12);
    expect(r.result).toBe(13);
    expect(r.operation).toBe('division');
    const chunks = r.steps.filter((s) => s.kind === 'division-chunk');
    expect(chunks.length).toBe(2);
    expect(chunks[0].changeValue).toBe(120);
    expect(chunks[1].changeValue).toBe(36);
    expect(r.abnGrid?.kind).toBe('division-three-col');
    if (r.abnGrid?.kind === 'division-three-col') {
      expect(r.abnGrid.rows.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('throws on divisor zero', () => {
    expect(() => generateAbnDivisionSteps(10, 0)).toThrow(RangeError);
  });

  it('handles quotient zero', () => {
    const r = generateAbnDivisionSteps(5, 12);
    expect(r.result).toBe(0);
    expect(r.steps.every((s) => s.kind !== 'division-chunk')).toBe(true);
  });
});
