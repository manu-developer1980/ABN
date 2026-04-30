import { describe, expect, it } from 'vitest';
import { generateAbnAdditionSteps } from '../addition';

describe('generateAbnAdditionSteps', () => {
  it('computes 348 + 276 with transfer from first summand', () => {
    const r = generateAbnAdditionSteps(348, 276);
    expect(r.result).toBe(624);
    expect(r.operation).toBe('addition');
    expect(r.operands).toEqual([348, 276]);
    expect(r.abnGrid?.kind).toBe('addition-transfer');
  });

  it('includes decomposition and addition-transfer steps', () => {
    const r = generateAbnAdditionSteps(348, 276);
    const kinds = r.steps.map((s) => s.kind);
    expect(kinds[0]).toBe('decomposition');
    expect(kinds.filter((k) => k === 'addition-transfer').length).toBeGreaterThan(0);
    expect(kinds[kinds.length - 1]).toBe('result');
  });

  it('matches classic 12 + 13 rejilla (traslado 2 y 10)', () => {
    const r = generateAbnAdditionSteps(12, 13);
    expect(r.result).toBe(25);
    expect(r.abnGrid?.kind).toBe('addition-transfer');
    if (r.abnGrid?.kind === 'addition-transfer') {
      expect(r.abnGrid.parts).toEqual([2, 10]);
      expect(r.abnGrid.rows).toHaveLength(2);
      expect(r.abnGrid.rows[0]).toMatchObject({
        part: 2,
        leftAfter: 10,
        rightAfter: 15,
      });
      expect(r.abnGrid.rows[1]).toMatchObject({
        part: 10,
        leftAfter: 0,
        rightAfter: 25,
      });
    }
  });

  it('handles second summand zero', () => {
    const r = generateAbnAdditionSteps(42, 0);
    expect(r.result).toBe(42);
  });

  it('handles 304 + 10 with transfer from 304', () => {
    const r = generateAbnAdditionSteps(304, 10);
    expect(r.result).toBe(314);
    const transfers = r.steps.filter((s) => s.kind === 'addition-transfer');
    expect(transfers.length).toBeGreaterThanOrEqual(1);
    expect(transfers[transfers.length - 1].afterValue).toBe(0);
  });

  it('throws for negative operands', () => {
    expect(() => generateAbnAdditionSteps(-1, 2)).toThrow(RangeError);
    expect(() => generateAbnAdditionSteps(1, -2)).toThrow(RangeError);
  });
});
