import { decomposeByPlaceValue } from './decomposition';
import type {
  AbnCalculationResult,
  AbnMultiplicationGrid,
  AbnStep,
} from './types';

function buildDecompositionExpression(parts: number[]): string {
  if (parts.length === 0) return '';
  return parts.join(' + ');
}

function buildMultiplicationGrid(
  a: number,
  b: number,
): AbnMultiplicationGrid {
  const aParts = decomposeByPlaceValue(a);
  const bParts = decomposeByPlaceValue(b);

  if (bParts.length <= 1) {
    const multiplier = bParts.length === 0 ? 0 : bParts[0];
    const partialProducts = aParts.map((p) => p * multiplier);
    const runningTotals: (number | null)[] = [];
    let acc = 0;
    partialProducts.forEach((pp, i) => {
      acc += pp;
      runningTotals.push(i === partialProducts.length - 1 ? acc : acc);
    });
    return {
      kind: 'multiplication-3col',
      multiplicandParts: aParts,
      multiplier: multiplier,
      partialProducts,
      runningTotals,
    };
  }

  const matrix = aParts.map((ai) => bParts.map((bj) => ai * bj));
  const rowSums = matrix.map((row) => row.reduce((s, x) => s + x, 0));
  const total = rowSums.reduce((s, x) => s + x, 0);
  return {
    kind: 'multiplication-matrix',
    aParts,
    bParts,
    matrix,
    rowSums,
    total,
  };
}

/**
 * Multiplicación ABN: descomposición del multiplicador y productos parciales;
 * datos para rejilla 3 columnas o matriz según las cifras del multiplicador.
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
  if (parts.length === 1) {
    const fragment = parts[0];
    const aParts = decomposeByPlaceValue(a);
    aParts.forEach((ap, index) => {
      const product = ap * fragment;
      const before = running;
      running += product;
      steps.push({
        id: `partial-${ap}-${index}`,
        kind: 'partial-product',
        title: `Calculamos ${ap} × ${fragment}`,
        explanation:
          before === 0
            ? `Primer producto parcial: ${ap} × ${fragment} = ${product}.`
            : `Sumamos este producto al acumulado (${before} + ${product} = ${running}).`,
        expression:
          before === 0
            ? `${ap} × ${fragment} = ${product}`
            : `${before} + ${product} = ${running}`,
        beforeValue: before,
        changeValue: product,
        afterValue: running,
        partialResult: product,
      });
    });
  } else {
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
      });
    });
  }

  steps.push({
    id: 'result',
    kind: 'result',
    title: 'Resultado final',
    explanation: `El producto de ${a} y ${b} es ${a * b}.`,
    expression: `${a} × ${b} = ${a * b}`,
    partialResult: a * b,
  });

  const abnGrid = buildMultiplicationGrid(a, b);

  return {
    operation: 'multiplication',
    operands: [a, b],
    result: a * b,
    steps,
    abnGrid,
  };
}
