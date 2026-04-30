import { describe, expect, it } from 'vitest';
import { OPERAND_MAX } from '../constants';
import { validateOperandInput } from '../validators';

describe('validateOperandInput', () => {
  it('accepts valid integers in range', () => {
    expect(validateOperandInput('0')).toEqual({ valid: true, value: 0 });
    expect(validateOperandInput('9999')).toEqual({ valid: true, value: 9999 });
  });

  it('rejects empty', () => {
    const r = validateOperandInput('');
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.message).toContain('válido');
  });

  it('rejects non-integers', () => {
    const r = validateOperandInput('3.5');
    expect(r.valid).toBe(false);
  });

  it('rejects out of range', () => {
    const r = validateOperandInput(String(OPERAND_MAX + 1));
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.message).toMatch(/9999/);
  });
});
