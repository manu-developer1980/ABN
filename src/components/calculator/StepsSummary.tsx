import { useState } from 'react';
import type { AbnCalculationResult } from '../../features/abn/types';
import { formatCalculationPlainText } from '../../features/abn/formatters';
import { Button } from '../ui/Button';

type StepsSummaryProps = {
  calculation: AbnCalculationResult;
};

export function StepsSummary({ calculation }: StepsSummaryProps) {
  const [copied, setCopied] = useState(false);
  const text = formatCalculationPlainText(calculation);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      className="mt-8 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-inner"
      aria-label="Resumen de todos los pasos"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-900">Todos los pasos</h2>
        <Button type="button" variant="secondary" onClick={handleCopy}>
          {copied ? 'Copiado' : 'Copiar explicación'}
        </Button>
      </div>
      <ol className="list-decimal space-y-4 pl-5 text-slate-800">
        {calculation.steps.map((step) => (
          <li key={step.id} className="pl-1">
            <p className="font-semibold text-teal-900">{step.title}</p>
            <p className="text-slate-700">{step.explanation}</p>
            <p className="mt-1 font-mono text-slate-900">{step.expression}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
