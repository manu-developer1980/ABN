import { describe, expect, it } from 'vitest';
import { generateAbnAdditionSteps } from '../addition';
import { generateAbnDivisionSteps } from '../division';
import { generateAbnMultiplicationSteps } from '../multiplication';
import { visibleGridRowCount } from '../rejillaVisibility';
import { generateAbnSubtractionSteps } from '../subtraction';

describe('visibleGridRowCount', () => {
  it('addition: 0 filas en descomposición; una por traslado; todas en resultado', () => {
    const calc = generateAbnAdditionSteps(12, 13);
    expect(visibleGridRowCount(calc, 0)).toBe(0);
    expect(visibleGridRowCount(calc, 1)).toBe(1);
    expect(visibleGridRowCount(calc, 2)).toBe(2);
    expect(visibleGridRowCount(calc, 3)).toBe(2);
  });

  it('subtraction: 0 en descomposición; una por resta paralela; todas en resultado', () => {
    const calc = generateAbnSubtractionSteps(52, 35);
    expect(visibleGridRowCount(calc, 0)).toBe(0);
    expect(visibleGridRowCount(calc, 1)).toBe(1);
    expect(visibleGridRowCount(calc, 2)).toBe(2);
    expect(visibleGridRowCount(calc, 3)).toBe(2);
  });

  it('multiplication 3 col: una fila por producto parcial', () => {
    const calc = generateAbnMultiplicationSteps(47, 8);
    expect(calc.abnGrid?.kind).toBe('multiplication-3col');
    expect(visibleGridRowCount(calc, 0)).toBe(0);
    expect(visibleGridRowCount(calc, 1)).toBe(1);
    expect(visibleGridRowCount(calc, 2)).toBe(2);
    expect(visibleGridRowCount(calc, 3)).toBe(2);
  });

  it('multiplication matriz: filas al ritmo de pasos parciales hasta el resultado', () => {
    const calc = generateAbnMultiplicationSteps(23, 14);
    expect(calc.abnGrid?.kind).toBe('multiplication-matrix');
    const n = calc.abnGrid?.kind === 'multiplication-matrix' ? calc.abnGrid.aParts.length : 0;
    expect(visibleGridRowCount(calc, 0)).toBe(0);
    expect(visibleGridRowCount(calc, 1)).toBe(1);
    expect(visibleGridRowCount(calc, 2)).toBe(Math.min(2, n));
    expect(visibleGridRowCount(calc, calc.steps.length - 1)).toBe(n);
  });

  it('division: filas por trozos; fila resumen solo con paso resultado', () => {
    const calc = generateAbnDivisionSteps(100, 7);
    const total = calc.abnGrid?.kind === 'division-three-col' ? calc.abnGrid.rows.length : 0;
    expect(visibleGridRowCount(calc, 0)).toBe(0);
    expect(visibleGridRowCount(calc, 1)).toBe(1);
    expect(visibleGridRowCount(calc, calc.steps.length - 1)).toBe(total);
  });

  it('division cociente 0: rejilla completa en el único paso', () => {
    const calc = generateAbnDivisionSteps(3, 7);
    expect(calc.steps.length).toBe(1);
    expect(visibleGridRowCount(calc, 0)).toBe(2);
  });
});
