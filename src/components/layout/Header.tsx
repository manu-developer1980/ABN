import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-base font-medium transition-colors',
    isActive
      ? 'bg-teal-700 text-white'
      : 'text-slate-800 hover:bg-teal-100 hover:text-slate-900',
  ].join(' ');

export function Header() {
  return (
    <header className="border-b border-teal-200/80 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight text-teal-900 no-underline"
          end
        >
          ABN Paso a Paso
        </NavLink>
        <nav
          className="flex flex-wrap gap-1"
          aria-label="Navegación principal"
        >
          <NavLink to="/" className={linkClass} end>
            Inicio
          </NavLink>
          <NavLink to="/que-es-abn" className={linkClass}>
            Qué es ABN
          </NavLink>
          <NavLink to="/calculadora" className={linkClass}>
            Calculadora
          </NavLink>
          <NavLink to="/fuentes" className={linkClass}>
            Fuentes
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
