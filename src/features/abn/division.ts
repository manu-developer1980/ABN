import { decomposeByPlaceValue } from './decomposition';
import type { AbnCalculationResult, AbnStep } from './types';

function buildDecompositionExpression(parts: number[]): string {
  if (parts.length === 0) return '';
  return parts.join(' + ');
}

/**
 * División ABN: cociente entero descompuesto en grupos del divisor; en cada paso
 * se resta (grupos × divisor) del dividendo restante.
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
    return {
      operation: 'division',
      operands: [dividend, divisor],
      result: quotient,
      steps,
    };
  }

  const parts = decomposeByPlaceValue(quotient);
  const expr = `${quotient} = ${buildDecompositionExpression(parts)}`;
  steps.push({
    id: `decomposition-quotient-${quotient}`,
    kind: 'decomposition',
    title: `Descomponemos el cociente entero`,
    explanation: `${dividend} ÷ ${divisor} tiene cociente entero ${quotient} y resto ${remainder}. Descomponemos ${quotient} en ${buildDecompositionExpression(parts)} para quitar grupos de ${divisor}.`,
    expression: expr,
  });

  let runningRemainder = dividend;
  let accumulatedGroups = 0;

  parts.forEach((groupCount, index) => {
    const product = groupCount * divisor;
    const before = runningRemainder;
    runningRemainder -= product;
    accumulatedGroups += groupCount;
    steps.push({
      id: `div-chunk-${groupCount}-${index}`,
      kind: 'division-chunk',
      title: `Quitamos ${groupCount} grupo${groupCount === 1 ? '' : 's'} de ${divisor}`,
      explanation: `Restamos ${product} (${groupCount} × ${divisor}) del resto actual (${before}).`,
      expression: `${before} − ${product} = ${runningRemainder}`,
      beforeValue: before,
      changeValue: product,
      afterValue: runningRemainder,
      partialResult: accumulatedGroups,
    });
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

  return {
    operation: 'division',
    operands: [dividend, divisor],
    result: quotient,
    steps,
  };
}
