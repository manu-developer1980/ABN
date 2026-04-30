import type { FormEvent } from 'react';
import { useState } from 'react';
import type { AbnOperation } from '../../features/abn/types';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

type OperationFormProps = {
  operation: AbnOperation;
  onOperationChange: (op: AbnOperation) => void;
  onSubmitOperands: (rawA: string, rawB: string) => void;
  errorMessage?: string | null;
};

const OPERATION_OPTIONS: { value: AbnOperation; label: string }[] = [
  { value: 'addition', label: 'Suma' },
  { value: 'subtraction', label: 'Resta' },
  { value: 'multiplication', label: 'Multiplicación' },
  { value: 'division', label: 'División' },
];

const LABELS: Record<
  AbnOperation,
  { a: string; b: string; legend: string; hint: string }
> = {
  addition: {
    a: 'Primer sumando (A)',
    b: 'Segundo sumando (B)',
    legend: 'Suma ABN',
    hint: 'Descomposición del segundo sumando y acumulación sobre el primero.',
  },
  subtraction: {
    a: 'Minuendo',
    b: 'Sustrahendo',
    legend: 'Resta ABN',
    hint: 'Descomponemos la diferencia y la sumamos al sustrahendo hasta el minuendo (minuendo ≥ sustrahendo).',
  },
  multiplication: {
    a: 'Multiplicando',
    b: 'Multiplicador',
    legend: 'Multiplicación ABN',
    hint: 'Descomposición del multiplicador y suma de productos parciales.',
  },
  division: {
    a: 'Dividendo',
    b: 'Divisor',
    legend: 'División ABN',
    hint: 'Cociente entero: descomponemos el cociente y quitamos grupos del divisor (divisor > 0).',
  },
};

export function OperationForm({
  operation,
  onOperationChange,
  onSubmitOperands,
  errorMessage,
}: OperationFormProps) {
  const [rawA, setRawA] = useState('');
  const [rawB, setRawB] = useState('');
  const labels = LABELS[operation];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmitOperands(rawA, rawB);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-teal-100 bg-white/95 p-6 shadow-md"
      noValidate
    >
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-slate-900">{labels.legend}</legend>
        <Select
          id="operation-type"
          label="Operación"
          options={OPERATION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          value={operation}
          onChange={(e) => onOperationChange(e.target.value as AbnOperation)}
        />
        <p className="text-sm text-slate-600">{labels.hint}</p>
        <p className="text-sm text-slate-600">
          Números enteros entre 0 y 9999 (salvo divisor en división: debe ser mayor que 0).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="operand-a"
            name="operandA"
            label={labels.a}
            value={rawA}
            onChange={(e) => setRawA(e.target.value)}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? 'form-error' : undefined}
          />
          <Input
            id="operand-b"
            name="operandB"
            label={labels.b}
            value={rawB}
            onChange={(e) => setRawB(e.target.value)}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? 'form-error' : undefined}
          />
        </div>
        {errorMessage ? (
          <div id="form-error">
            <Alert role="alert">{errorMessage}</Alert>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Calcular</Button>
        </div>
      </fieldset>
    </form>
  );
}
