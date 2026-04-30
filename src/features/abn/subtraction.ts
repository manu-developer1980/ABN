import { decomposeByPlaceValue } from './decomposition';
import type { AbnCalculationResult, AbnStep, AbnSubtractionGrid } from './types';

function buildDecompositionExpression(parts: number[]): string {
  if (parts.length === 0) return '';
  return parts.join(' + ');
}

/**
 * Resta ABN en rejilla paralela: en cada fila se resta la misma cantidad del minuendo
 * y de lo que aún falta por restar (hasta que la tercera columna llega a 0).
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
      explanation: `${minuend} − ${subtrahend} = 0.`,
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
    const grid: AbnSubtractionGrid = {
      kind: 'subtraction-parallel',
      initialMinuend: minuend,
      initialSubtrahend: subtrahend,
      chunks: [],
      rows: [],
    };
    return {
      operation: 'subtraction',
      operands: [minuend, subtrahend],
      result: 0,
      steps,
      abnGrid: grid,
    };
  }

  const chunks = decomposeByPlaceValue(subtrahend);
  const expr = `${subtrahend} = ${buildDecompositionExpression(chunks)}`;

  steps.push({
    id: `decomposition-sub-${subtrahend}`,
    kind: 'decomposition',
    title: `Descomponemos el sustrahendo`,
    explanation: `Restamos por partes: descomponemos ${subtrahend} en ${buildDecompositionExpression(chunks)}. En cada paso restamos la misma cantidad del minuendo y de “lo que falta por restar”.`,
    expression: expr,
  });

  let m = minuend;
  let s = subtrahend;
  const gridRows: AbnSubtractionGrid['rows'] = [];

  chunks.forEach((chunk, index) => {
    const beforeM = m;
    const beforeS = s;
    m -= chunk;
    s -= chunk;
    gridRows.push({ chunk, minuendAfter: m, subtrahendAfter: s });
    steps.push({
      id: `parallel-${chunk}-${index}`,
      kind: 'subtraction-parallel',
      title: `Restamos ${chunk}`,
      explanation: `Minuendo: ${beforeM} − ${chunk} = ${m}. Falta por restar: ${beforeS} − ${chunk} = ${s}.`,
      expression: `${beforeM} − ${chunk} = ${m}; ${beforeS} − ${chunk} = ${s}`,
      beforeValue: beforeM,
      changeValue: chunk,
      afterValue: m,
    });
  });

  steps.push({
    id: 'result',
    kind: 'result',
    title: 'Resultado final',
    explanation: `La resta de ${minuend} y ${subtrahend} es ${diff}. El minuendo queda en ${m}.`,
    expression: `${minuend} − ${subtrahend} = ${diff}`,
    partialResult: diff,
  });

  const abnGrid: AbnSubtractionGrid = {
    kind: 'subtraction-parallel',
    initialMinuend: minuend,
    initialSubtrahend: subtrahend,
    chunks,
    rows: gridRows,
  };

  return {
    operation: 'subtraction',
    operands: [minuend, subtrahend],
    result: diff,
    steps,
    abnGrid,
  };
}
