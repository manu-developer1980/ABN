import type { ReactNode } from 'react';

type AlertProps = {
  children: ReactNode;
  role?: 'status' | 'alert';
};

export function Alert({ children, role = 'status' }: AlertProps) {
  return (
    <div
      role={role}
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
    >
      {children}
    </div>
  );
}
