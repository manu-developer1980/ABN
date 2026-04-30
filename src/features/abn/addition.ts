import { decomposeAscendingByPlaceValue } from './decomposition';
import type { AbnAdditionGrid, AbnCalculationResult, AbnStep } from './types';

function buildDecompositionExpression(parts: number[]): string {
  if (parts.length === 0) return '';
  return parts.join(' + ');
}

/**
 * Suma ABN en tabla de traslado: se descompone el **primer** sumando y cada parte
 * se pasa al segundo hasta que el primero queda en 0 (rejilla tipo aula).
 */
export function generateAbnAdditionSteps(a: number, b: number): AbnCalculationResult {
  if (!Number.isInteger(a) || a < 0 || !Number.isInteger(b) || b < 0) {
    throw new RangeError('operands must be non-negative integers');
  }

  const steps: AbnStep[] = [];

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

  const parts = decomposeAscendingByPlaceValue(a);
  const expr = `${a} = ${buildDecompositionExpression(parts)}`;
  steps.push({
    id: `decomposition-${a}`,
    kind: 'decomposition',
    title: `Descomponemos ${a}`,
    explanation: `En la rejilla ABN descomponemos el primer sumando ${a} en ${buildDecompositionExpression(parts)} y lo vamos pasando al segundo (${b}).`,
    expression: expr,
  });

  let left = a;
  let right = b;
  const gridRows: AbnAdditionGrid['rows'] = [];

  parts.forEach((fragment, index) => {
    const beforeLeft = left;
    const beforeRight = right;
    left -= fragment;
    right += fragment;
    gridRows.push({
      part: fragment,
      leftAfter: left,
      rightAfter: right,
    });
    steps.push({
      id: `transfer-${fragment}-${index}`,
      kind: 'addition-transfer',
      title: `Pasamos ${fragment}`,
      explanation: `Quitamos ${fragment} del primer sumando (${beforeLeft} → ${left}) y lo sumamos al segundo (${beforeRight} → ${right}).`,
      expression: `${beforeLeft} − ${fragment} = ${left}; ${beforeRight} + ${fragment} = ${right}`,
      beforeValue: beforeLeft,
      changeValue: fragment,
      afterValue: left,
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
