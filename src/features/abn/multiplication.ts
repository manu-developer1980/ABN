import { decomposeByPlaceValue } from './decomposition';
import type { AbnCalculationResult, AbnStep } from './types';

function buildDecompositionExpression(parts: number[]): string {
  if (parts.length === 0) return '';
  return parts.join(' + ');
}

/**
 * Multiplicación ABN: descomposición del segundo factor y suma de productos parciales.
 */
export function generateAbnMultiplicationSteps(a: number, b: number): AbnCalculationResult {
  if (!Number.isInteger(a) || a < 0 || !Number.isInteger(b) || b < 0) {
    throw new RangeError('operands must be non-negative integers');
  }

  const parts = decomposeByPlaceValue(b);
  const expr = `${b} = ${buildDecompositionExpression(parts)}`;
  const steps: AbnStep[] = [];

  steps.push({
    id: `decomposition-${b}`,
    kind: 'decomposition',
    title: `Descomponemos ${b}`,
    explanation: `Para multiplicar de forma ABN, descomponemos ${b} en ${buildDecompositionExpression(parts)}.`,
    expression: expr,
  });

  let running = 0;
  parts.forEach((fragment, index) => {
    const product = a * fragment;
    const before = running;
    running += product;
    steps.push({
      id: `partial-${fragment}-${index}`,
      kind: 'partial-product',
      title: `Calculamos ${a} × ${fragment}`,
      explanation:
        before === 0
          ? `Primer producto parcial: ${a} × ${fragment}.`
          : `Sumamos este producto al acumulado (${before}).`,
      expression:
        before === 0
          ? `${a} × ${fragment} = ${product}`
          : `${before} + ${product} = ${running}`,
      beforeValue: before,
      changeValue: product,
      afterValue: running,
      partialResult: product,
      meta: { multiplicationFragment: fragment },
    });
  });

  steps.push({
    id: 'result',
    kind: 'result',
    title: 'Resultado final',
    explanation: `El producto de ${a} y ${b} es ${a * b}.`,
    expression: `${a} × ${b} = ${a * b}`,
    partialResult: a * b,
  });

  return {
    operation: 'multiplication',
    operands: [a, b],
    result: a * b,
    steps,
  };
}
