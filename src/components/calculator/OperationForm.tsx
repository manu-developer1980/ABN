import type { FormEvent } from 'react';
import { useState } from 'react';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type OperationFormProps = {
  onSubmitOperands: (rawA: string, rawB: string) => void;
  errorMessage?: string | null;
};

export function OperationForm({ onSubmitOperands, errorMessage }: OperationFormProps) {
  const [rawA, setRawA] = useState('');
  const [rawB, setRawB] = useState('');

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
        <legend className="text-lg font-semibold text-slate-900">
          Suma ABN
        </legend>
        <p className="text-sm text-slate-600">
          Introduce dos números enteros entre 0 y 9999 (números naturales en esta
          versión).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="operand-a"
            name="operandA"
            label="Primer sumando (A)"
            value={rawA}
            onChange={(e) => setRawA(e.target.value)}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? 'form-error' : undefined}
          />
          <Input
            id="operand-b"
            name="operandB"
            label="Segundo sumando (B)"
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
