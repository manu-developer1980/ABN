import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 focus-visible:outline-teal-700',
  secondary:
    'border-2 border-teal-600 bg-white text-teal-900 hover:bg-teal-50 focus-visible:outline-teal-600',
  ghost: 'text-teal-900 hover:bg-teal-100 focus-visible:outline-teal-600',
};

export function Button({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-base font-semibold transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
