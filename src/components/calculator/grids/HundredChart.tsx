/**
 * Rejilla tipo tablero del 100 (10×10) para situar cantidades en el aula.
 * Resalta el valor actual y, si caben en 1–100, inicio y fin del recorrido.
 */
type HundredChartProps = {
  focus: number;
  rangeStart?: number;
  rangeEnd?: number;
};

function inChart(n: number): boolean {
  return n >= 1 && n <= 100;
}

export function HundredChart({ focus, rangeStart, rangeEnd }: HundredChartProps) {
  const cells = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div
      className="rounded-xl border border-slate-200 bg-amber-50/40 p-3"
      aria-label="Rejilla del 1 al 100"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
        Rejilla 1–100
      </p>
      <div className="grid grid-cols-10 gap-0.5 sm:gap-1">
        {cells.map((n) => {
          const isFocus = n === focus && inChart(focus);
          const inRange =
            rangeStart !== undefined &&
            rangeEnd !== undefined &&
            inChart(rangeStart) &&
            inChart(rangeEnd) &&
            n >= Math.min(rangeStart, rangeEnd) &&
            n <= Math.max(rangeStart, rangeEnd);
          const base =
            'flex aspect-square min-h-0 items-center justify-center rounded border text-[10px] font-semibold sm:text-xs';
          let cls = `${base} border-slate-200 bg-white text-slate-700`;
          if (inRange && !isFocus) cls = `${base} border-teal-200 bg-teal-50 text-teal-900`;
          if (isFocus) cls = `${base} border-teal-600 bg-teal-600 text-white ring-2 ring-teal-400`;
          return (
            <div key={n} className={cls}>
              {n}
            </div>
          );
        })}
      </div>
      {(!inChart(focus) || (rangeStart && !inChart(rangeStart))) ? (
        <p className="mt-2 text-center text-xs text-slate-500">
          Algún valor queda fuera de 1–100; la rejilla sirve como referencia visual
          aproximada.
        </p>
      ) : null}
    </div>
  );
}
