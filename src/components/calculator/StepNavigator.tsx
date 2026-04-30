import { Button } from '../ui/Button';

type StepNavigatorProps = {
  currentIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  showAll: boolean;
  onToggleShowAll: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export function StepNavigator({
  currentIndex,
  totalSteps,
  onPrev,
  onNext,
  showAll,
  onToggleShowAll,
  canPrev,
  canNext,
}: StepNavigatorProps) {
  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="secondary" onClick={onPrev} disabled={!canPrev}>
          Anterior
        </Button>
        <span className="px-2 text-base font-medium text-slate-800" aria-live="polite">
          Paso {currentIndex + 1} de {totalSteps}
        </span>
        <Button type="button" variant="secondary" onClick={onNext} disabled={!canNext}>
          Siguiente
        </Button>
      </div>
      <Button
        type="button"
        variant={showAll ? 'primary' : 'ghost'}
        onClick={onToggleShowAll}
        aria-pressed={showAll}
      >
        {showAll ? 'Ver paso a paso' : 'Ver todos los pasos'}
      </Button>
    </div>
  );
}
