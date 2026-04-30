import { describe, expect, it } from 'vitest';
import { generateAbnAdditionSteps } from '../addition';
import { generateAbnDivisionSteps } from '../division';
import { formatCalculationPlainText } from '../formatters';

describe('formatCalculationPlainText', () => {
  it('formats addition header', () => {
    const r = generateAbnAdditionSteps(2, 3);
    const txt = formatCalculationPlainText(r);
    expect(txt).toContain('Operación: 2 + 3');
  });

  it('formats division chunk with minus sign in plain text', () => {
    const r = generateAbnDivisionSteps(156, 12);
    const txt = formatCalculationPlainText(r);
    expect(txt).toContain('Operación: 156 ÷ 12');
    expect(txt).toContain('Cambio:');
    expect(txt).toContain('120');
  });
});
