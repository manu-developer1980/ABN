import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export function Input({ label, id, className = '', ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
      </label>
      <input
        id={id}
        className={[
          'min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-lg text-slate-900 shadow-sm',
          'focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50',
          className,
        ].join(' ')}
        inputMode="numeric"
        autoComplete="off"
        {...rest}
      />
    </div>
  );
}
