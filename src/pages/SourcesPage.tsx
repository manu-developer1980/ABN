import { losPinosFeaturedBlock, sourceCategories } from '../data/sources';

export function SourcesPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-teal-950">Fuentes y materiales</h1>
        <p className="mt-2 max-w-2xl text-lg text-slate-700">
          Recursos utilizados para orientar explicaciones y terminología. Los textos
          de la aplicación están adaptados; no se copian fuentes extensas
          literalmente.
        </p>
      </header>

      <section
        aria-labelledby="los-pinos-featured-heading"
        className="rounded-2xl border-2 border-teal-400/90 bg-gradient-to-br from-teal-50 via-white to-amber-50/40 p-6 shadow-md ring-1 ring-teal-200/60 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-800">
          Referencia prioritaria
        </p>
        <h2
          id="los-pinos-featured-heading"
          className="mt-1 text-2xl font-bold text-teal-950 sm:text-3xl"
        >
          {losPinosFeaturedBlock.heading}
        </h2>
        <p className="mt-0.5 text-sm font-medium text-slate-600">
          {losPinosFeaturedBlock.subheading}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-800">
          {losPinosFeaturedBlock.intro}
        </p>
        <ul className="mt-6 space-y-4">
          {losPinosFeaturedBlock.items.map((item) => (
            <li
              key={item.href}
              className="rounded-xl border border-teal-200/80 bg-white/95 p-4 shadow-sm backdrop-blur-sm"
            >
              <a
                href={item.href}
                className="text-lg font-semibold text-teal-900 underline decoration-teal-400 decoration-2 underline-offset-2 hover:text-teal-800"
                target="_blank"
                rel="noreferrer noopener"
              >
                {item.title}
              </a>
              <p className="mt-1 text-sm font-medium text-slate-600">Tipo: {item.type}</p>
              <p className="mt-2 text-slate-700">{item.usage}</p>
            </li>
          ))}
        </ul>
      </section>

      {sourceCategories.map((category) => (
        <section key={category.id} aria-labelledby={`cat-${category.id}`}>
          <h2
            id={`cat-${category.id}`}
            className="border-b border-teal-200 pb-2 text-2xl font-semibold text-teal-900"
          >
            {category.label}
          </h2>
          <ul className="mt-4 space-y-6">
            {category.items.map((item) => (
              <li
                key={item.href}
                className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm"
              >
                <a
                  href={item.href}
                  className="text-lg font-semibold text-teal-800 underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.title}
                </a>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  Tipo: {item.type}
                </p>
                <p className="mt-2 text-slate-700">{item.usage}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
