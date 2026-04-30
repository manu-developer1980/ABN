import type { SelectHTMLAttributes } from 'react';

type SelectOption = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  options: SelectOption[];
};

export function Select({ label, id, options, className = '', ...rest }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
      </label>
      <select
        id={id}
        className={[
          'min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-lg text-slate-900 shadow-sm',
          'focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50',
          className,
        ].join(' ')}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
