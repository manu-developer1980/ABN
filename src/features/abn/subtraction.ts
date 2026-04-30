import { decomposeByPlaceValue } from './decomposition';
import type { AbnCalculationResult, AbnStep } from './types';

function buildDecompositionExpression(parts: number[]): string {
  if (parts.length === 0) return '';
  return parts.join(' + ');
}

/**
 * Resta ABN: descomponemos la diferencia (minuendo − sustrahendo) y la vamos
 * sumando al sustrahendo hasta llegar al minuendo (equivalente a una escalera ascendente).
 */
export function generateAbnSubtractionSteps(
  minuend: number,
  subtrahend: number,
): AbnCalculationResult {
  if (!Number.isInteger(minuend) || minuend < 0) {
    throw new RangeError('minuend must be a non-negative integer');
  }
  if (!Number.isInteger(subtrahend) || subtrahend < 0) {
    throw new RangeError('subtrahend must be a non-negative integer');
  }
  if (minuend < subtrahend) {
    throw new RangeError('minuend must be greater than or equal to subtrahend');
  }

  const diff = minuend - subtrahend;
  const steps: AbnStep[] = [];

  if (diff === 0) {
    steps.push({
      id: 'decomposition-diff-0',
      kind: 'decomposition',
      title: 'Diferencia cero',
      explanation: `${minuend} − ${subtrahend} = 0. No hace falta descomponer.`,
      expression: `${minuend} − ${subtrahend} = 0`,
    });
    steps.push({
      id: 'result',
      kind: 'result',
      title: 'Resultado final',
      explanation: `La resta de ${minuend} y ${subtrahend} es 0.`,
      expression: `${minuend} − ${subtrahend} = 0`,
      partialResult: 0,
    });
    return {
      operation: 'subtraction',
      operands: [minuend, subtrahend],
      result: 0,
      steps,
    };
  }

  const parts = decomposeByPlaceValue(diff);
  const expr = `${diff} = ${buildDecompositionExpression(parts)}`;

  steps.push({
    id: `decomposition-diff-${diff}`,
    kind: 'decomposition',
    title: `Descomponemos la diferencia`,
    explanation: `${minuend} − ${subtrahend} = ${diff}. Descomponemos ${diff} en ${buildDecompositionExpression(parts)} para ir sumando al sustrahendo (${subtrahend}) hasta llegar al minuendo (${minuend}).`,
    expression: expr,
  });

  let running = subtrahend;
  parts.forEach((fragment, index) => {
    const before = running;
    running += fragment;
    steps.push({
      id: `sub-jump-${fragment}-${index}`,
      kind: 'subtraction-jump',
      title: `Subimos ${fragment}`,
      explanation: `Partimos de ${before} y añadimos ${fragment}. Nos acercamos al minuendo.`,
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
    explanation: `La resta de ${minuend} y ${subtrahend} es ${diff}.`,
    expression: `${minuend} − ${subtrahend} = ${diff}`,
    partialResult: diff,
  });

  return {
    operation: 'subtraction',
    operands: [minuend, subtrahend],
    result: diff,
    steps,
  };
}
