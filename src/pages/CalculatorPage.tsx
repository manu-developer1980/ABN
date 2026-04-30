import { useMemo, useState } from 'react';
import type { AbnCalculationResult, AbnOperation } from '../features/abn/types';
import { runAbnCalculation } from '../features/abn/runCalculation';
import { validateOperandInput } from '../features/abn/validators';
import { OperationForm } from '../components/calculator/OperationForm';
import { PlaceValueBlocks } from '../components/calculator/PlaceValueBlocks';
import { StepCard } from '../components/calculator/StepCard';
import { StepNavigator } from '../components/calculator/StepNavigator';
import { StepsSummary } from '../components/calculator/StepsSummary';
import { VisualNumberLine } from '../components/calculator/VisualNumberLine';
import { Button } from '../components/ui/Button';

function operationSymbol(op: AbnOperation): string {
  switch (op) {
    case 'addition':
      return '+';
    case 'subtraction':
      return '−';
    case 'multiplication':
      return '×';
    case 'division':
      return '÷';
    default:
      return '?';
  }
}

export function CalculatorPage() {
  const [operation, setOperation] = useState<AbnOperation>('addition');
  const [calculation, setCalculation] = useState<AbnCalculationResult | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const steps = calculation?.steps ?? [];
  const safeIndex = Math.min(
    stepIndex,
    Math.max(0, steps.length > 0 ? steps.length - 1 : 0),
  );
  const currentStep = steps.length > 0 ? steps[safeIndex] : undefined;

  const scaleMax = useMemo(() => {
    if (!calculation) return 0;
    const [x, y] = calculation.operands;
    return Math.max(x, y, calculation.result, x + y, x * y, 1);
  }, [calculation]);

  const placeBlocksValue = useMemo(() => {
    if (!calculation || !currentStep) return null;
    if (currentStep.kind !== 'decomposition') return null;
    const [x, y] = calculation.operands;
    switch (calculation.operation) {
      case 'subtraction':
        return x - y;
      case 'division':
        return Math.floor(x / y);
      default:
        return y;
    }
  }, [calculation, currentStep]);

  function handleSubmitOperands(rawA: string, rawB: string) {
    setErrorMessage(null);
    const a = validateOperandInput(rawA);
    if (!a.valid) {
      setErrorMessage(a.message);
      setCalculation(null);
      return;
    }
    const b = validateOperandInput(rawB);
    if (!b.valid) {
      setErrorMessage(b.message);
      setCalculation(null);
      return;
    }
    if (operation === 'division' && b.value === 0) {
      setErrorMessage('El divisor debe ser mayor que 0.');
      setCalculation(null);
      return;
    }
    try {
      const result = runAbnCalculation(operation, a.value, b.value);
      setCalculation(result);
      setStepIndex(0);
      setShowAll(false);
    } catch (err) {
      const msg =
        err instanceof RangeError
          ? err.message === 'minuend must be greater than or equal to subtrahend'
            ? 'En la resta, el minuendo debe ser mayor o igual al sustrahendo.'
            : err.message
          : 'No se pudo calcular. Comprueba los números.';
      setErrorMessage(msg);
      setCalculation(null);
    }
  }

  function handleReset() {
    setCalculation(null);
    setErrorMessage(null);
    setStepIndex(0);
    setShowAll(false);
    setFormKey((k) => k + 1);
  }

  function handleOperationChange(op: AbnOperation) {
    setOperation(op);
    setCalculation(null);
    setErrorMessage(null);
    setStepIndex(0);
    setShowAll(false);
    setFormKey((k) => k + 1);
  }

  const [opA, opB] = calculation?.operands ?? [0, 0];
  const sym = calculation ? operationSymbol(calculation.operation) : '+';
  const remainder =
    calculation?.operation === 'division' && calculation.operands[1] !== 0
      ? calculation.operands[0] % calculation.operands[1]
      : null;

  const showNumberLine =
    currentStep &&
    (currentStep.kind === 'accumulation' ||
      currentStep.kind === 'subtraction-jump' ||
      currentStep.kind === 'partial-product' ||
      currentStep.kind === 'division-chunk') &&
    currentStep.beforeValue !== undefined &&
    currentStep.afterValue !== undefined;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-teal-950">Calculadora ABN</h1>
        <p className="mt-2 max-w-2xl text-lg text-slate-700">
          Suma, resta, multiplicación y división con pasos explicados.
        </p>
      </header>

      <OperationForm
        key={formKey}
        operation={operation}
        onOperationChange={handleOperationChange}
        onSubmitOperands={handleSubmitOperands}
        errorMessage={errorMessage}
      />

      {calculation ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3">
            <div>
              <p className="text-lg font-semibold text-teal-950">
                Operación actual:{' '}
                <span className="font-mono">
                  {opA} {sym} {opB}
                </span>
              </p>
              {calculation.operation === 'division' &&
              remainder !== null &&
              remainder > 0 ? (
                <p className="mt-1 text-sm text-slate-700">
                  Cociente entero:{' '}
                  <span className="font-mono font-semibold">{calculation.result}</span>
                  {' — '}
                  Resto: <span className="font-mono font-semibold">{remainder}</span>
                </p>
              ) : null}
            </div>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reiniciar
            </Button>
          </div>

          {!showAll && currentStep ? (
            <>
              <StepCard
                step={currentStep}
                stepIndex={safeIndex}
                stepCount={steps.length}
              />
              {placeBlocksValue !== null && currentStep.kind === 'decomposition' ? (
                <PlaceValueBlocks value={placeBlocksValue} />
              ) : null}
              {showNumberLine ? (
                <VisualNumberLine
                  before={currentStep.beforeValue}
                  after={currentStep.afterValue}
                  max={scaleMax}
                  mode={
                    currentStep.kind === 'division-chunk' ? 'decrease' : 'increase'
                  }
                />
              ) : null}
            </>
          ) : null}

          {showAll && calculation ? (
            <StepsSummary calculation={calculation} />
          ) : null}

          {steps.length > 0 ? (
            <StepNavigator
              currentIndex={safeIndex}
              totalSteps={steps.length}
              onPrev={() => setStepIndex((i) => Math.max(0, i - 1))}
              onNext={() =>
                setStepIndex((i) => Math.min(steps.length - 1, i + 1))
              }
              showAll={showAll}
              onToggleShowAll={() => setShowAll((v) => !v)}
              canPrev={!showAll && safeIndex > 0}
              canNext={!showAll && safeIndex < steps.length - 1}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
