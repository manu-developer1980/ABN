import { decomposeByPlaceValue } from './decomposition';
import type { AbnCalculationResult, AbnStep } from './types';

function buildDecompositionExpression(parts: number[]): string {
  if (parts.length === 0) return '';
  return parts.join(' + ');
}

/**
 * Generates ABN-style step-by-step explanation for a + b (natural numbers, MVP range).
 */
export function generateAbnAdditionSteps(a: number, b: number): AbnCalculationResult {
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
    explanation: `Para sumar de forma ABN, descomponemos ${b} en ${buildDecompositionExpression(parts)}.`,
    expression: expr,
  });

  let running = a;
  parts.forEach((fragment, index) => {
    const before = running;
    running += fragment;
    const title = `Añadimos ${fragment}`;
    steps.push({
      id: `add-${fragment}-${index}`,
      kind: 'accumulation',
      title,
      explanation: `Partimos de ${before} y añadimos ${fragment}.`,
      expression: `${before} + ${fragment} = ${running}`,
      beforeValue: before,
      changeValue: fragment,
      afterValue: running,
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

  return {
    operation: 'addition',
    operands: [a, b],
    result: a + b,
    steps,
  };
}
