export function AboutAbnPage() {
  return (
    <article className="prose prose-slate max-w-none space-y-6 text-lg">
      <h1 className="text-3xl font-bold text-teal-950">Qué es el método ABN</h1>
      <p className="text-slate-700">
        ABN son las siglas de <strong>Algoritmos Abiertos Basados en Números</strong>.
        Es una forma de trabajar el cálculo en la que los números se entienden como
        cantidades completas, no solo como cifras en columnas.
      </p>
      <p className="text-slate-700">
        A diferencia de los algoritmos <em>cerrados</em> tradicionales (basados en
        cifras y pasos fijos), los algoritmos <em>abiertos</em> permiten descomponer,
        reorganizar y elegir estrategias que encajen con el problema y con el
        pensamiento del alumno o la alumna.
      </p>
      <p className="text-slate-700">
        La <strong>descomposición numérica</strong> (por ejemplo, ver 276 como 200 +
        70 + 6) fortalece el sentido del número y el cálculo mental.
      </p>
      <p className="text-slate-700">
        El método se usa con frecuencia en <strong>Educación Primaria</strong> para
        dar flexibilidad y comprensión frente al mero automatismo.
      </p>
      <p className="text-slate-700">
        En esta web, la <strong>calculadora paso a paso</strong> está alineada con el
        material de referencia del Colegio Los Pinos (apartados de suma, resta,
        multiplicación y división del documento único ABN): en la suma, traslado desde
        el segundo sumando hacia el primero hasta vaciar el segundo; en la división,
        aproximaciones sucesivas restando productos del divisor por el mayor bloque
        posible del cociente entero en cada resto.
      </p>
      <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-base text-amber-950">
        Esta web es un <strong>recurso de apoyo</strong> para practicar y explicar
        ideas ABN; no es una fuente curricular oficial única. Consulta siempre las
        orientaciones de tu centro y materiales acreditados.
      </p>
    </article>
  );
}
