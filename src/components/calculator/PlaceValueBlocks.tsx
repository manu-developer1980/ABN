import { motion } from 'framer-motion';

type PlaceValueBlocksProps = {
  value: number;
};

function splitPlaceValues(n: number): {
  thousands: number;
  hundreds: number;
  tens: number;
  ones: number;
} {
  const thousands = Math.floor(n / 1000);
  const hundreds = Math.floor((n % 1000) / 100);
  const tens = Math.floor((n % 100) / 10);
  const ones = n % 10;
  return { thousands, hundreds, tens, ones };
}

const chip =
  'flex h-10 min-w-10 items-center justify-center rounded-md border px-1 text-xs font-bold shadow-sm sm:text-sm';

export function PlaceValueBlocks({ value }: PlaceValueBlocksProps) {
  const { thousands, hundreds, tens, ones } = splitPlaceValues(value);
  const groups = [
    {
      label: 'Millares (×1000)',
      count: thousands,
      unit: 1000,
      color: 'bg-violet-100 border-violet-300 text-violet-900',
    },
    {
      label: 'Centenas (×100)',
      count: hundreds,
      unit: 100,
      color: 'bg-sky-100 border-sky-300 text-sky-900',
    },
    {
      label: 'Decenas (×10)',
      count: tens,
      unit: 10,
      color: 'bg-amber-100 border-amber-300 text-amber-900',
    },
    {
      label: 'Unidades',
      count: ones,
      unit: 1,
      color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    },
  ];

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
        Descomposición por valor posicional
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-600">{g.label}</span>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: g.count }, (_, i) => (
                <motion.span
                  key={`${g.label}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className={`${chip} ${g.color}`}
                  aria-hidden="true"
                >
                  {g.unit}
                </motion.span>
              ))}
              {g.count === 0 ? (
                <span className="text-xs text-slate-400">—</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-slate-600">Número: {value}</p>
    </div>
  );
}
