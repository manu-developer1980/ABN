/**
 * Modelo de área: rejilla de filas × columnas (hasta 12×12 por legibilidad).
 */
type MultiplicationAreaGridProps = {
  rows: number;
  cols: number;
};

const MAX_DIM = 12;

export function MultiplicationAreaGrid({ rows, cols }: MultiplicationAreaGridProps) {
  const r = Math.min(Math.max(rows, 0), MAX_DIM);
  const c = Math.min(Math.max(cols, 0), MAX_DIM);
  const total = r * c;

  return (
    <div
      className="rounded-xl border border-slate-200 bg-violet-50/50 p-3"
      aria-label="Rejilla de multiplicación tipo área"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
        Rejilla de área ({rows} × {cols})
        {rows > MAX_DIM || cols > MAX_DIM ? (
          <span className="font-normal text-slate-500">
            {' '}
            (mostrando hasta {MAX_DIM}×{MAX_DIM})
          </span>
        ) : null}
      </p>
      <div
        className="inline-grid gap-0.5 rounded-md border border-violet-200 bg-white p-1"
        style={{
          gridTemplateColumns: `repeat(${c}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className="aspect-square min-h-[6px] w-2 rounded-sm bg-violet-400/90 sm:w-3"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
