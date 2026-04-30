import type { AbnCalculationResult, AbnStep } from '../../features/abn/types';
import { DivisionGroupsGrid } from './grids/DivisionGroupsGrid';
import { HundredChart } from './grids/HundredChart';
import { MultiplicationAreaGrid } from './grids/MultiplicationAreaGrid';

type StepVisualGridsProps = {
  calculation: AbnCalculationResult;
  currentStep: AbnStep;
};

export function StepVisualGrids({ calculation, currentStep }: StepVisualGridsProps) {
  const [a, b] = calculation.operands;
  const { operation } = calculation;

  if (currentStep.kind === 'decomposition') {
    if (operation === 'division') {
      const q = Math.floor(a / b);
      if (q === 0) {
        return (
          <p className="mt-4 text-sm text-slate-600">
            Cociente 0: no hay grupos enteros que representar en la rejilla.
          </p>
        );
      }
      return (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-slate-600">
            Cociente entero <span className="font-mono font-semibold">{q}</span> en la
            rejilla 1–100 (referencia aproximada si el cociente es mayor que 100).
          </p>
          <HundredChart focus={Math.min(Math.max(q, 1), 100)} />
        </div>
      );
    }
    const diff = operation === 'subtraction' ? a - b : null;
    const focus =
      operation === 'subtraction' && diff !== null
        ? Math.min(Math.max(diff, 1), 100)
        : Math.min(Math.max(b, 1), 100);
    return (
      <div className="mt-4 space-y-4">
        <HundredChart
          focus={focus}
          rangeStart={operation === 'addition' ? a : operation === 'subtraction' ? b : undefined}
          rangeEnd={
            operation === 'addition'
              ? a + b
              : operation === 'subtraction'
                ? a
                : undefined
          }
        />
      </div>
    );
  }

  if (
    operation === 'multiplication' &&
    currentStep.kind === 'partial-product' &&
    currentStep.meta?.multiplicationFragment !== undefined
  ) {
    const frag = currentStep.meta.multiplicationFragment;
    return (
      <div className="mt-4">
        <MultiplicationAreaGrid rows={a} cols={frag} />
      </div>
    );
  }

  if (
    operation === 'division' &&
    currentStep.kind === 'division-chunk' &&
    currentStep.meta?.divisionGroups !== undefined
  ) {
    const g = currentStep.meta.divisionGroups;
    return (
      <div className="mt-4">
        <DivisionGroupsGrid groups={g} divisor={b} />
      </div>
    );
  }

  if (
    (operation === 'addition' && currentStep.kind === 'accumulation') ||
    (operation === 'subtraction' && currentStep.kind === 'subtraction-jump')
  ) {
    const end = operation === 'addition' ? a + b : a;
    const focus =
      currentStep.afterValue !== undefined
        ? Math.min(Math.max(currentStep.afterValue, 1), 100)
        : end;
    return (
      <div className="mt-4">
        <HundredChart
          focus={focus}
          rangeStart={operation === 'addition' ? a : b}
          rangeEnd={end}
        />
      </div>
    );
  }

  return null;
}
