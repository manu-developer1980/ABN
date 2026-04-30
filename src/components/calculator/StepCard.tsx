import { motion } from 'framer-motion';
import type { AbnStep } from '../../features/abn/types';

type StepCardProps = {
  step: AbnStep;
  stepIndex: number;
  stepCount: number;
};

export function StepCard({ step, stepIndex, stepCount }: StepCardProps) {
  return (
    <motion.article
      key={step.id}
      layout
      initial={{ opacity: 0.92, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-teal-100 bg-white p-6 shadow-md"
      aria-labelledby={`step-title-${step.id}`}
    >
      <p className="text-sm font-medium text-teal-800">
        Paso {stepIndex + 1} de {stepCount}
      </p>
      <h2
        id={`step-title-${step.id}`}
        className="mt-1 text-2xl font-bold text-slate-900"
      >
        {step.title}
      </h2>
      <p className="mt-3 text-lg text-slate-700">{step.explanation}</p>
      {(step.beforeValue !== undefined &&
        step.changeValue !== undefined &&
        step.afterValue !== undefined) ? (
        <motion.div
          layout
          className="mt-4 grid gap-2 rounded-xl bg-teal-50/80 p-4 text-base sm:grid-cols-3"
        >
          <motion.div layout>
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Antes
            </span>
            <motion.span
              layout
              className="text-xl font-semibold text-slate-900"
              key={`before-${step.afterValue}`}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
            >
              {step.beforeValue}
            </motion.span>
          </motion.div>
          <motion.div layout>
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Cambio
            </span>
            <span className="text-xl font-semibold text-teal-800">
              +{step.changeValue}
            </span>
          </motion.div>
          <motion.div layout>
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Después
            </span>
            <motion.span
              layout
              className="text-xl font-semibold text-teal-900"
              key={`after-${step.afterValue}`}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
            >
              {step.afterValue}
            </motion.span>
          </motion.div>
        </motion.div>
      ) : null}
      <p className="mt-4 font-mono text-lg text-slate-900">{step.expression}</p>
    </motion.article>
  );
}
