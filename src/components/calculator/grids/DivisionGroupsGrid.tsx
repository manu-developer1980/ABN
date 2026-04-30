/**
 * Rejilla de grupos: cada fila es un “grupo” de tamaño divisor (columnas).
 */
type DivisionGroupsGridProps = {
  groups: number;
  divisor: number;
};

const MAX_ROWS = 10;
const MAX_COLS = 12;

export function DivisionGroupsGrid({ groups, divisor }: DivisionGroupsGridProps) {
  const rows = Math.min(Math.max(groups, 0), MAX_ROWS);
  const cols = Math.min(Math.max(divisor, 0), MAX_COLS);

  return (
    <div
      className="rounded-xl border border-slate-200 bg-sky-50/50 p-3"
      aria-label="Rejilla de grupos en la división"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
        Grupos de {divisor} (filas = grupos quitados en este paso)
        {groups > MAX_ROWS || divisor > MAX_COLS ? (
          <span className="font-normal text-slate-500">
            {' '}
            (vista hasta {MAX_ROWS}×{MAX_COLS})
          </span>
        ) : null}
      </p>
      <div
        className="inline-grid gap-0.5 rounded-md border border-sky-300 bg-white p-1"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: rows * cols }, (_, i) => (
          <div
            key={i}
            className="aspect-square min-h-[6px] w-2 rounded-sm bg-sky-500/85 sm:w-3"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
