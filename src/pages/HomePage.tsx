import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-teal-100 bg-white/90 p-8 shadow-md">
        <h1 className="text-3xl font-bold text-teal-950 sm:text-4xl">
          ABN Paso a Paso
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">
          Aprende cálculo ABN paso a paso con explicaciones visuales,
          descomposición de números y operaciones guiadas.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/calculadora"
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            Ir a la calculadora
          </Link>
          <Link
            to="/que-es-abn"
            className="inline-flex items-center justify-center rounded-lg border-2 border-teal-600 px-5 py-3 text-base font-semibold text-teal-800 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Qué es el método ABN
          </Link>
          <Link
            to="/fuentes"
            className="text-base font-medium text-teal-800 underline-offset-4 hover:underline"
          >
            Fuentes y materiales
          </Link>
        </div>
      </section>
    </div>
  );
}
