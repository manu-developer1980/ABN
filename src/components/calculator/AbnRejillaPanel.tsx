import { motion } from 'framer-motion';
import { visibleGridRowCount } from '../../features/abn/rejillaVisibility';
import type {
  AbnCalculationResult,
  AbnDivisionGrid,
  AbnMultiplicationGrid,
  AbnRejilla,
} from '../../features/abn/types';

type AbnRejillaPanelProps = {
  calculation: AbnCalculationResult;
  stepIndex: number;
};

function AdditionTable({
  grid,
  visibleRows,
  isComplete,
}: {
  grid: Extract<AbnRejilla, { kind: 'addition-transfer' }>;
  visibleRows: number;
  isComplete: boolean;
}) {
  const { initialLeft, initialRight, rows } = grid;
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-slate-800 bg-white p-2 shadow-sm">
      <p className="mb-2 text-center text-sm font-semibold text-slate-700">
        Rejilla ABN (traslado)
      </p>
      <table className="w-full min-w-[280px] border-collapse text-center text-base font-semibold">
        <thead>
          <tr>
            <th className="border border-slate-800 bg-amber-50 px-2 py-2">+</th>
            <th className="border border-slate-800 bg-amber-50 px-2 py-2">{initialLeft}</th>
            <th className="border border-slate-800 bg-amber-50 px-2 py-2">{initialRight}</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, visibleRows).map((r, i) => {
            const lastComplete =
              isComplete && visibleRows === rows.length && i === visibleRows - 1;
            return (
              <motion.tr
                key={i}
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 1 }}
                className="bg-white"
              >
                <td className="border border-slate-800 px-2 py-2">{r.part}</td>
                <td
                  className={`border border-slate-800 px-2 py-2 ${
                    lastComplete ? 'text-xl font-bold text-teal-800' : ''
                  }`}
                >
                  {r.leftAfter}
                </td>
                <td className="border border-slate-800 px-2 py-2">{r.rightAfter}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
      {isComplete && rows.length > 0 ? (
        <p className="mt-2 text-center text-sm text-slate-600">
          Resultado: {initialLeft} + {initialRight} ={' '}
          {rows[rows.length - 1].leftAfter}
        </p>
      ) : null}
    </div>
  );
}

function SubtractionTable({
  grid,
  visibleRows,
  isComplete,
}: {
  grid: Extract<AbnRejilla, { kind: 'subtraction-parallel' }>;
  visibleRows: number;
  isComplete: boolean;
}) {
  const { initialMinuend, initialSubtrahend, rows } = grid;
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-slate-800 bg-white p-2 shadow-sm">
      <p className="mb-2 text-center text-sm font-semibold text-slate-700">
        Rejilla ABN (resta en paralelo)
      </p>
      <table className="w-full min-w-[280px] border-collapse text-center text-base font-semibold">
        <thead>
          <tr>
            <th className="border border-slate-800 bg-teal-50 px-2 py-2">−</th>
            <th className="border border-slate-800 bg-teal-50 px-2 py-2">{initialMinuend}</th>
            <th className="border border-slate-800 bg-teal-50 px-2 py-2">{initialSubtrahend}</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, visibleRows).map((r, i) => {
            const lastComplete =
              isComplete && visibleRows === rows.length && i === visibleRows - 1;
            return (
              <motion.tr key={i} initial={{ opacity: 0.85 }} animate={{ opacity: 1 }}>
                <td className="border border-slate-800 px-2 py-2">{r.chunk}</td>
                <td
                  className={`border border-slate-800 px-2 py-2 ${
                    lastComplete ? 'text-xl font-bold text-teal-900' : ''
                  }`}
                >
                  {r.minuendAfter}
                </td>
                <td className="border border-slate-800 px-2 py-2 text-emerald-800">
                  {r.subtrahendAfter}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
      {isComplete && rows.length > 0 ? (
        <p className="mt-2 text-center text-sm text-slate-600">
          Resultado en el minuendo: {rows[rows.length - 1].minuendAfter}
        </p>
      ) : null}
    </div>
  );
}

function Multiplication3Col({
  grid,
  visibleRows,
  isComplete,
}: {
  grid: Extract<AbnMultiplicationGrid, { kind: 'multiplication-3col' }>;
  visibleRows: number;
  isComplete: boolean;
}) {
  const { multiplicandParts, multiplier, partialProducts, runningTotals } = grid;
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-slate-800 bg-white p-2 shadow-sm">
      <p className="mb-2 text-center text-sm font-semibold text-slate-700">
        Rejilla ABN (productos parciales)
      </p>
      <table className="w-full min-w-[320px] border-collapse text-center text-sm font-semibold sm:text-base">
        <thead>
          <tr>
            <th className="border border-slate-800 bg-violet-50 px-1 py-2 sm:px-2">
              Descomposición
            </th>
            <th className="border border-slate-800 bg-violet-50 px-1 py-2 sm:px-2">
              × {multiplier}
            </th>
            <th className="border border-slate-800 bg-violet-50 px-1 py-2 sm:px-2">
              Suma acumulada
            </th>
          </tr>
        </thead>
        <tbody>
          {multiplicandParts.slice(0, visibleRows).map((part, i) => {
            const lastComplete =
              isComplete &&
              visibleRows === multiplicandParts.length &&
              i === visibleRows - 1;
            return (
              <motion.tr key={i} initial={{ opacity: 0.85 }} animate={{ opacity: 1 }}>
                <td className="border border-slate-800 px-1 py-2 sm:px-2">{part}</td>
                <td className="border border-slate-800 px-1 py-2 sm:px-2">
                  {partialProducts[i]}
                </td>
                <td
                  className={`border border-slate-800 px-1 py-2 sm:px-2 ${
                    lastComplete ? 'text-lg font-bold text-orange-700' : ''
                  }`}
                >
                  {runningTotals[i]}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MultiplicationMatrix({
  grid,
  visibleRows,
  isComplete,
}: {
  grid: Extract<AbnMultiplicationGrid, { kind: 'multiplication-matrix' }>;
  visibleRows: number;
  isComplete: boolean;
}) {
  const { aParts, bParts, matrix, rowSums, total } = grid;
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-slate-800 bg-white p-2 shadow-sm">
      <p className="mb-2 text-center text-sm font-semibold text-slate-700">
        Rejilla ABN (matriz de productos)
      </p>
      <table className="w-full border-collapse text-center text-xs font-semibold sm:text-sm">
        <thead>
          <tr>
            <th className="border border-slate-800 bg-violet-50 p-1" />
            {bParts.map((b, j) => (
              <th key={j} className="border border-slate-800 bg-violet-50 p-1 sm:p-2">
                × {b}
              </th>
            ))}
            <th className="border border-slate-800 bg-violet-100 p-1 sm:p-2">Fila</th>
          </tr>
        </thead>
        <tbody>
          {aParts.slice(0, visibleRows).map((aRow, i) => (
            <motion.tr key={i} initial={{ opacity: 0.85 }} animate={{ opacity: 1 }}>
              <td className="border border-slate-800 bg-violet-50 p-1 font-bold sm:p-2">
                {aRow}
              </td>
              {bParts.map((_, j) => (
                <td key={j} className="border border-slate-800 p-1 sm:p-2">
                  {matrix[i][j]}
                </td>
              ))}
              <td className="border border-slate-800 bg-sky-50 p-1 font-bold text-sky-900 sm:p-2">
                {rowSums[i]}
              </td>
            </motion.tr>
          ))}
        </tbody>
        {isComplete ? (
          <tfoot>
            <tr>
              <td
                className="border border-slate-800 bg-orange-50 p-2 text-center text-base font-bold text-orange-800 sm:text-lg"
                colSpan={bParts.length + 2}
              >
                Total = {total}
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}

function DivisionTable({
  grid,
  visibleRows,
}: {
  grid: AbnDivisionGrid;
  visibleRows: number;
}) {
  const { divisor, rows } = grid;
  const slice = rows.slice(0, visibleRows);
  const lastIdx = slice.length - 1;
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-slate-800 bg-white p-2 shadow-sm">
      <p className="mb-2 text-center text-sm font-semibold text-slate-700">
        Rejilla ABN (división)
      </p>
      <table className="w-full min-w-[300px] border-collapse text-center text-sm font-semibold sm:text-base">
        <thead>
          <tr>
            <th className="border border-slate-800 bg-sky-50 p-1 sm:p-2" colSpan={2} />
            <th className="border border-slate-800 bg-sky-50 p-1 sm:p-2">{divisor}</th>
          </tr>
          <tr>
            <th className="border border-slate-800 bg-sky-100 p-1 sm:p-2">Resto</th>
            <th className="border border-slate-800 bg-sky-100 p-1 text-xs sm:p-2 sm:text-sm">
              Cantidad quitada
              <br />
              <span className="font-normal">(k × divisor)</span>
            </th>
            <th className="border border-slate-800 bg-sky-100 p-1 text-xs sm:p-2 sm:text-sm">
              Cociente parcial
            </th>
          </tr>
        </thead>
        <tbody>
          {slice.map((row, i) => (
            <motion.tr key={i} initial={{ opacity: 0.85 }} animate={{ opacity: 1 }}>
              <td
                className={`border border-slate-800 p-1 sm:p-2 ${
                  i > 0 && row.remainder < slice[0].remainder ? 'text-emerald-800' : ''
                } ${i === lastIdx && row.subtracted === null ? 'font-bold text-emerald-900' : ''}`}
              >
                {row.remainder}
              </td>
              <td className="border border-slate-800 p-1 sm:p-2">
                {row.subtracted ?? '—'}
              </td>
              <td
                className={`border border-slate-800 p-1 sm:p-2 ${
                  row.subtracted === null && row.partialQuotient !== null
                    ? 'font-bold text-red-700'
                    : 'text-sky-800'
                }`}
              >
                {row.partialQuotient ?? '—'}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-center text-xs text-slate-500">
        El divisor ({divisor}) multiplica cada cociente parcial para obtener la cantidad
        quitada.
      </p>
    </div>
  );
}

export function AbnRejillaPanel({ calculation, stepIndex }: AbnRejillaPanelProps) {
  const grid = calculation.abnGrid;
  if (!grid) return null;

  const isComplete = stepIndex >= calculation.steps.length - 1;
  const vr = visibleGridRowCount(calculation, stepIndex);

  if (grid.kind === 'addition-transfer') {
    return <AdditionTable grid={grid} visibleRows={vr} isComplete={isComplete} />;
  }

  if (grid.kind === 'subtraction-parallel') {
    return <SubtractionTable grid={grid} visibleRows={vr} isComplete={isComplete} />;
  }

  if (grid.kind === 'multiplication-3col') {
    return <Multiplication3Col grid={grid} visibleRows={vr} isComplete={isComplete} />;
  }

  if (grid.kind === 'multiplication-matrix') {
    return <MultiplicationMatrix grid={grid} visibleRows={vr} isComplete={isComplete} />;
  }

  if (grid.kind === 'division-three-col') {
    return <DivisionTable grid={grid} visibleRows={vr} />;
  }

  return null;
}
