import { decomposeByPlaceValue } from './decomposition';
import type {
  AbnCalculationResult,
  AbnDivisionGrid,
  AbnStep,
} from './types';

/**
 * División ABN según aproximación sucesiva (documento único Colegio Los Pinos):
 * en cada resto se considera el cociente entero posible q = ⌊resto/divisor⌋ y se
 * quita primero el mayor bloque de valor posicional de q (p. ej. 157÷9: 10, luego 7),
 * coincidiendo con los ejemplos del PDF (77÷9, 157÷9, 59831÷25).
 */
export function generateAbnDivisionSteps(
  dividend: number,
  divisor: number,
): AbnCalculationResult {
  if (!Number.isInteger(dividend) || dividend < 0) {
    throw new RangeError('dividend must be a non-negative integer');
  }
  if (!Number.isInteger(divisor) || divisor <= 0) {
    throw new RangeError('divisor must be a positive integer');
  }

  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  const steps: AbnStep[] = [];

  if (quotient === 0) {
    steps.push({
      id: 'result',
      kind: 'result',
      title: 'Resultado final',
      explanation: `El cociente entero de ${dividend} entre ${divisor} es 0 y el resto es ${remainder}.`,
      expression: `${dividend} = 0 × ${divisor} + ${remainder}`,
      partialResult: 0,
    });
    const abnGrid: AbnDivisionGrid = {
      kind: 'division-three-col',
      divisor,
      rows: [
        {
          remainder: dividend,
          subtracted: null,
          partialQuotient: null,
        },
        {
          remainder,
          subtracted: null,
          partialQuotient: 0,
        },
      ],
      totalQuotient: 0,
      finalRemainder: remainder,
    };
    return {
      operation: 'division',
      operands: [dividend, divisor],
      result: quotient,
      steps,
      abnGrid,
    };
  }

  steps.push({
    id: 'division-method',
    kind: 'decomposition',
    title: 'División por aproximaciones',
    explanation: `Para ${dividend} ÷ ${divisor} vamos restando del dividendo (o del resto que va quedando) productos del divisor por un factor, siempre buscando una buena aproximación. En cada paso tomamos el mayor bloque de valor posicional del cociente entero que cabe en el resto actual (metodología ABN).`,
    expression: `${dividend} ÷ ${divisor}`,
  });

  let runningRemainder = dividend;
  let accumulatedGroups = 0;
  const gridRows: AbnDivisionGrid['rows'] = [];
  let chunkIndex = 0;

  while (runningRemainder >= divisor) {
    const q = Math.floor(runningRemainder / divisor);
    if (q === 0) break;

    const parts = decomposeByPlaceValue(q);
    const groupCount = parts[0];
    const product = groupCount * divisor;
    const before = runningRemainder;

    gridRows.push({
      remainder: before,
      subtracted: product,
      partialQuotient: groupCount,
    });

    runningRemainder -= product;
    accumulatedGroups += groupCount;

    steps.push({
      id: `div-chunk-${groupCount}-${chunkIndex}`,
      kind: 'division-chunk',
      title: `Quitamos ${groupCount} grupo${groupCount === 1 ? '' : 's'} de ${divisor}`,
      explanation: `En el resto ${before} caben hasta ${q} veces el divisor; quitamos ${groupCount} × ${divisor} = ${product}.`,
      expression: `${before} − ${product} = ${runningRemainder}`,
      beforeValue: before,
      changeValue: product,
      afterValue: runningRemainder,
      partialResult: accumulatedGroups,
    });
    chunkIndex += 1;
  }

  gridRows.push({
    remainder: runningRemainder,
    subtracted: null,
    partialQuotient: quotient,
  });

  steps.push({
    id: 'result',
    kind: 'result',
    title: 'Resultado final',
    explanation:
      remainder === 0
        ? `Cociente exacto: ${quotient}.`
        : `Cociente entero: ${quotient}, resto: ${remainder}.`,
    expression:
      remainder === 0
        ? `${dividend} ÷ ${divisor} = ${quotient}`
        : `${dividend} = ${quotient} × ${divisor} + ${remainder}`,
    partialResult: quotient,
  });

  const abnGrid: AbnDivisionGrid = {
    kind: 'division-three-col',
    divisor,
    rows: gridRows,
    totalQuotient: quotient,
    finalRemainder: remainder,
  };

  return {
    operation: 'division',
    operands: [dividend, divisor],
    result: quotient,
    steps,
    abnGrid,
  };
}
