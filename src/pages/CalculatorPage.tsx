import { useMemo, useState } from 'react';
import { generateAbnAdditionSteps } from '../features/abn/addition';
import type { AbnCalculationResult } from '../features/abn/types';
import { validateOperandInput } from '../features/abn/validators';
import { OperationForm } from '../components/calculator/OperationForm';
import { PlaceValueBlocks } from '../components/calculator/PlaceValueBlocks';
import { StepCard } from '../components/calculator/StepCard';
import { StepNavigator } from '../components/calculator/StepNavigator';
import { StepsSummary } from '../components/calculator/StepsSummary';
import { VisualNumberLine } from '../components/calculator/VisualNumberLine';
import { Button } from '../components/ui/Button';

export function CalculatorPage() {
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
    return Math.max(...calculation.operands, calculation.result, 1);
  }, [calculation]);

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
    try {
      const result = generateAbnAdditionSteps(a.value, b.value);
      setCalculation(result);
      setStepIndex(0);
      setShowAll(false);
    } catch {
      setErrorMessage('No se pudo calcular. Comprueba los números.');
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

  const [, secondOperand] = calculation?.operands ?? [0, 0];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-teal-950">Calculadora ABN</h1>
        <p className="mt-2 max-w-2xl text-lg text-slate-700">
          Suma paso a paso: descomposición del segundo sumando y acumulación sobre
          el primero.
        </p>
      </header>

      <OperationForm
        key={formKey}
        onSubmitOperands={handleSubmitOperands}
        errorMessage={errorMessage}
      />

      {calculation ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3">
            <p className="text-lg font-semibold text-teal-950">
              Operación actual:{' '}
              <span className="font-mono">
                {calculation.operands[0]} + {calculation.operands[1]}
              </span>
            </p>
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
              {currentStep.kind === 'decomposition' ? (
                <PlaceValueBlocks value={secondOperand} />
              ) : null}
              {currentStep.kind === 'accumulation' ? (
                <VisualNumberLine
                  before={currentStep.beforeValue}
                  after={currentStep.afterValue}
                  max={scaleMax}
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
