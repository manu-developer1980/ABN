import { decomposeByPlaceValue } from './decomposition';
import type { AbnAdditionGrid, AbnCalculationResult, AbnStep } from './types';

function buildDecompositionExpression(parts: number[]): string {
  if (parts.length === 0) return '';
  return parts.join(' + ');
}

/**
 * Suma ABN en tabla de traslado (Colegio Los Pinos / documento único ABN):
 * se descompone el **segundo** sumando en centenas, decenas, unidades… y cada
 * parte se transfiere del segundo al primero hasta que el segundo queda en 0.
 */
export function generateAbnAdditionSteps(a: number, b: number): AbnCalculationResult {
  if (!Number.isInteger(a) || a < 0 || !Number.isInteger(b) || b < 0) {
    throw new RangeError('operands must be non-negative integers');
  }

  const steps: AbnStep[] = [];

  if (b === 0) {
    steps.push({
      id: 'decomposition-b-0',
      kind: 'decomposition',
      title: 'Segundo sumando es 0',
      explanation: `${a} + 0 = ${a}. No hay traslado que hacer.`,
      expression: `${a} + 0 = ${a}`,
    });
    steps.push({
      id: 'result',
      kind: 'result',
      title: 'Resultado final',
      explanation: `La suma de ${a} y ${b} es ${a}.`,
      expression: `${a} + ${b} = ${a}`,
      partialResult: a,
    });
    const grid: AbnAdditionGrid = {
      kind: 'addition-transfer',
      initialLeft: a,
      initialRight: 0,
      parts: [],
      rows: [],
    };
    return {
      operation: 'addition',
      operands: [a, b],
      result: a,
      steps,
      abnGrid: grid,
    };
  }

  if (a === 0) {
    steps.push({
      id: 'decomposition-0',
      kind: 'decomposition',
      title: 'Primer sumando es 0',
      explanation: `0 + ${b} = ${b}. No hay traslado que hacer.`,
      expression: `0 + ${b} = ${b}`,
    });
    steps.push({
      id: 'result',
      kind: 'result',
      title: 'Resultado final',
      explanation: `La suma de ${a} y ${b} es ${b}.`,
      expression: `${a} + ${b} = ${b}`,
      partialResult: b,
    });
    const grid: AbnAdditionGrid = {
      kind: 'addition-transfer',
      initialLeft: 0,
      initialRight: b,
      parts: [],
      rows: [],
    };
    return {
      operation: 'addition',
      operands: [a, b],
      result: b,
      steps,
      abnGrid: grid,
    };
  }

  const parts = decomposeByPlaceValue(b);
  const expr = `${b} = ${buildDecompositionExpression(parts)}`;
  steps.push({
    id: `decomposition-${b}`,
    kind: 'decomposition',
    title: `Descomponemos ${b}`,
    explanation: `En la rejilla ABN descomponemos el segundo sumando ${b} en ${buildDecompositionExpression(parts)} y cada parte la pasamos del segundo al primero (${a}), hasta que el segundo queda en 0.`,
    expression: expr,
  });

  let left = a;
  let right = b;
  const gridRows: AbnAdditionGrid['rows'] = [];

  parts.forEach((fragment, index) => {
    const beforeLeft = left;
    const beforeRight = right;
    left += fragment;
    right -= fragment;
    gridRows.push({
      part: fragment,
      leftAfter: left,
      rightAfter: right,
    });
    steps.push({
      id: `transfer-${fragment}-${index}`,
      kind: 'addition-transfer',
      title: `Pasamos ${fragment}`,
      explanation: `Quitamos ${fragment} del segundo sumando (${beforeRight} → ${right}) y lo sumamos al primero (${beforeLeft} → ${left}).`,
      expression: `${beforeRight} − ${fragment} = ${right}; ${beforeLeft} + ${fragment} = ${left}`,
      beforeValue: beforeRight,
      changeValue: fragment,
      afterValue: right,
    });
  });

  steps.push({
    id: 'result',
    kind: 'result',
    title: 'Resultado final',
    explanation: `La suma de ${a} y ${b} es ${a + b}.`,
    expression: `${a} + ${b} = ${a + b}`,
    partialResult: a + b,
  });

  const abnGrid: AbnAdditionGrid = {
    kind: 'addition-transfer',
    initialLeft: a,
    initialRight: b,
    parts,
    rows: gridRows,
  };

  return {
    operation: 'addition',
    operands: [a, b],
    result: a + b,
    steps,
    abnGrid,
  };
}
