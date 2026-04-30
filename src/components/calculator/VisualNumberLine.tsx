type VisualNumberLineProps = {
  before?: number;
  after?: number;
  max: number;
};

/**
 * Simple bar showing relative position before/after an accumulation step.
 */
export function VisualNumberLine({ before, after, max }: VisualNumberLineProps) {
  if (max <= 0 || before === undefined || after === undefined) {
    return null;
  }
  const cap = Math.max(max, after, before, 1);
  const pct = (n: number) => Math.min(100, Math.max(0, (n / cap) * 100));

  return (
    <div
      className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
      aria-hidden="true"
    >
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        Línea de cantidad (aprox.)
      </p>
      <div className="relative h-3 rounded-full bg-slate-200">
        <div
          className="absolute top-0 h-3 rounded-full bg-slate-400/80"
          style={{ width: `${pct(before)}%` }}
        />
        <div
          className="absolute top-0 h-3 rounded-full bg-teal-500 transition-all duration-300"
          style={{ width: `${pct(after)}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm text-slate-600">
        <span>0</span>
        <span>{cap}</span>
      </div>
    </div>
  );
}
