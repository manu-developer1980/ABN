import type { AbnCalculationResult, AbnRejilla, AbnStepKind } from './types';

function maxGridRows(grid: AbnRejilla): number {
  switch (grid.kind) {
    case 'addition-transfer':
    case 'subtraction-parallel':
    case 'division-three-col':
      return grid.rows.length;
    case 'multiplication-3col':
      return grid.multiplicandParts.length;
    case 'multiplication-matrix':
      return grid.aParts.length;
    default:
      return 0;
  }
}

/** Paso que añade una fila nueva a la rejilla (no descomposición ni resultado). */
function stepAddsGridRow(operation: AbnCalculationResult['operation'], kind: AbnStepKind): boolean {
  switch (operation) {
    case 'addition':
      return kind === 'addition-transfer';
    case 'subtraction':
      return kind === 'subtraction-parallel';
    case 'multiplication':
      return kind === 'partial-product';
    case 'division':
      return kind === 'division-chunk';
    default:
      return false;
  }
}

/**
 * Cuántas filas de la rejilla deben mostrarse en el paso `stepIndex`.
 * Cuenta solo pasos que añaden fila (traslado, resta paralela, producto parcial, trozo de división);
 * en el último paso (resultado) se muestra la rejilla completa.
 */
export function visibleGridRowCount(
  calculation: AbnCalculationResult,
  stepIndex: number,
): number {
  const grid = calculation.abnGrid;
  if (!grid) return 0;

  const steps = calculation.steps;
  const lastIdx = Math.max(0, steps.length - 1);
  const maxRows = maxGridRows(grid);

  if (stepIndex >= lastIdx) return maxRows;
  if (stepIndex <= 0) return 0;

  let count = 0;
  for (let i = 1; i <= stepIndex; i++) {
    if (stepAddsGridRow(calculation.operation, steps[i].kind)) count += 1;
  }
  return Math.min(count, maxRows);
}
