# ABN Paso a Paso — Documentación técnica para agente de Cursor

## 1. Visión del proyecto

**ABN Paso a Paso** será una aplicación web educativa sobre el método ABN —Algoritmos Abiertos Basados en Números— orientada a Matemáticas de Educación Primaria.

El objetivo principal es crear una web que explique el método ABN y proporcione una **calculadora visual paso a paso** capaz de resolver operaciones mostrando el razonamiento intermedio, no solo el resultado final.

La aplicación debe servir tanto para:

- alumnado que quiere entender cómo se resuelve una operación mediante ABN;
- familias que necesitan acompañar el aprendizaje;
- docentes que quieren mostrar operaciones en clase;
- desarrolladores o mantenedores que quieran ampliar el proyecto con nuevas operaciones, ejercicios y recursos.

## 2. Objetivo funcional principal

Construir una calculadora ABN interactiva que permita introducir operaciones aritméticas y genere una secuencia de pasos visuales y explicados.

La experiencia esperada no es:

```txt
348 + 276 = 624
```

Sino:

```txt
Operación: 348 + 276

276 se descompone en 200 + 70 + 6.

Paso 1:
Partimos de 348 y añadimos 200.
348 + 200 = 548

Paso 2:
Ahora añadimos 70.
548 + 70 = 618

Paso 3:
Por último añadimos 6.
618 + 6 = 624

Resultado final:
348 + 276 = 624
```

Cada paso debe poder representarse con texto, expresión matemática, estado acumulado y visualización.

## 3. Alcance recomendado del MVP

### 3.1. MVP inicial

El primer entregable debe centrarse en una versión pequeña pero sólida:

1. Landing page sencilla.
2. Página introductoria: qué es el método ABN.
3. Calculadora visual de **suma ABN**.
4. Motor de generación de pasos desacoplado del UI.
5. Vista paso a paso.
6. Vista de todos los pasos.
7. Página de fuentes y recursos.
8. Tests unitarios para la lógica ABN.

### 3.2. Fuera del MVP inicial

No implementar inicialmente:

- autenticación;
- base de datos;
- panel docente;
- exportación a PDF;
- ejercicios guardados;
- estadísticas de progreso;
- backend propio;
- IA generativa;
- modo multiusuario.

Estos puntos pueden añadirse después, cuando la lógica educativa esté validada.

## 4. Roadmap funcional por fases

### Fase 1 — Suma ABN

- Entrada de dos números naturales positivos.
- Validación de entrada.
- Descomposición del segundo sumando en centenas, decenas y unidades, o en unidades de orden mayores si aplica.
- Generación de pasos acumulativos.
- Explicación textual de cada paso.
- Navegación paso a paso.
- Vista resumen.
- Tests unitarios.

### Fase 2 — Resta ABN

Incluir varias estrategias ABN de resta:

- resta por detracción;
- resta por escalera ascendente;
- resta por comparación o igualación, si se documenta correctamente.

Ejemplo de escalera ascendente:

```txt
523 - 287

De 287 a 300 van 13.
De 300 a 500 van 200.
De 500 a 523 van 23.

13 + 200 + 23 = 236
Resultado: 236
```

### Fase 3 — Multiplicación ABN

- Descomposición de uno de los factores.
- Producto parcial por decenas, centenas, unidades, etc.
- Suma de productos parciales.

Ejemplo:

```txt
23 × 14
14 = 10 + 4
23 × 10 = 230
23 × 4 = 92
230 + 92 = 322
```

### Fase 4 — División ABN

- División por reparto o extracción de grupos.
- Tabla de cociente acumulado y resto decreciente.

Ejemplo:

```txt
156 ÷ 12
Quitamos 10 grupos de 12: 156 - 120 = 36
Quitamos 3 grupos de 12: 36 - 36 = 0
Total grupos: 10 + 3 = 13
Resultado: 13
```

### Fase 5 — Recursos docentes

- Generador de ejercicios.
- Fichas imprimibles.
- Niveles por curso.
- Explicaciones adaptadas para alumnado y docentes.
- Comparativa ABN vs. algoritmo tradicional.

## 5. Requisitos funcionales

## 5.1. Página de inicio

Debe incluir:

- nombre del proyecto;
- descripción breve;
- acceso principal a la calculadora;
- acceso a explicación del método;
- acceso a fuentes y materiales;
- llamada a la acción clara.

Propuesta de copy:

```txt
Aprende cálculo ABN paso a paso con explicaciones visuales, descomposición de números y operaciones guiadas.
```

## 5.2. Página “Qué es ABN”

Debe explicar:

- qué significa ABN;
- diferencia entre algoritmos abiertos y algoritmos cerrados tradicionales;
- importancia de la descomposición numérica;
- cálculo mental;
- flexibilidad de estrategias;
- uso en Educación Primaria;
- advertencia de que la web es un recurso de apoyo, no una fuente oficial única.

## 5.3. Calculadora ABN

La calculadora debe permitir:

- seleccionar operación: suma en MVP;
- introducir operandos;
- validar operandos;
- generar pasos;
- avanzar y retroceder paso a paso;
- reiniciar;
- mostrar todos los pasos;
- copiar explicación o resultado en texto plano, opcional en MVP.

## 5.4. Visualización de pasos

Cada paso debe mostrar, como mínimo:

- número de paso;
- título breve;
- explicación;
- expresión matemática;
- valor acumulado;
- fragmento añadido/restado/multiplicado, cuando aplique;
- estado anterior y estado posterior.

Ejemplo visual textual:

```txt
Paso 2 de 3
Añadimos 70

Antes: 548
Cambio: +70
Después: 618

548 + 70 = 618
```

## 5.5. Página de fuentes

Debe listar las fuentes utilizadas, agrupadas por:

- marco teórico;
- guías docentes;
- materiales prácticos;
- repositorios generales.

Cada fuente debe incluir:

- título;
- tipo;
- uso recomendado dentro del proyecto;
- enlace.

## 6. Requisitos no funcionales

### 6.1. Mantenibilidad

- Separar la lógica ABN del JSX.
- Evitar lógica de negocio dentro de componentes React.
- Usar TypeScript estricto.
- Evitar `any` salvo justificación puntual.
- Componentes pequeños y reutilizables.
- Tests para lógica crítica.
- Nombres claros y consistentes.

### 6.2. Accesibilidad

- HTML semántico.
- Labels asociados a inputs.
- Botones con texto claro.
- Navegación por teclado.
- Contraste suficiente.
- No depender solo del color para transmitir información.
- Tamaños legibles para uso en aula.

### 6.3. Rendimiento

- El MVP debe funcionar como aplicación estática.
- No usar dependencias pesadas innecesarias.
- Generar los pasos en cliente.
- Mantener estado mínimo.
- Evitar renderizados complejos innecesarios.

### 6.4. Seguridad

Aunque el MVP no tenga backend:

- Validar entradas numéricas.
- Limitar rangos para evitar estados absurdos o problemas de UI.
- No usar `dangerouslySetInnerHTML` para contenido generado por usuario.
- Preparar el proyecto para futuras integraciones sin exponer claves.

## 7. Stack técnico recomendado

### 7.1. Frontend

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- React Router, si hay varias páginas.
- Vitest para tests unitarios.
- Testing Library para componentes.

### 7.2. Backend

No necesario en MVP.

Si se añade más adelante:

- Node.js.
- Express o Fastify.
- Validación con Zod.
- Supabase/PostgreSQL si se guardan ejercicios o progreso.
- API REST con respuestas consistentes.

### 7.3. Librerías a evitar inicialmente

Evitar al principio:

- Redux o Zustand, salvo que el estado crezca realmente;
- librerías de animación pesadas;
- frameworks de backend si no hay backend;
- dependencias matemáticas grandes para operaciones simples.

## 8. Arquitectura propuesta

```txt
src/
  app/
    App.tsx
    router.tsx
  pages/
    HomePage.tsx
    AboutAbnPage.tsx
    CalculatorPage.tsx
    SourcesPage.tsx
  components/
    layout/
      Header.tsx
      Footer.tsx
      PageShell.tsx
    calculator/
      OperationForm.tsx
      StepNavigator.tsx
      StepCard.tsx
      StepsSummary.tsx
      VisualNumberLine.tsx
      PlaceValueBlocks.tsx
    ui/
      Button.tsx
      Input.tsx
      Select.tsx
      Alert.tsx
  features/
    abn/
      types.ts
      constants.ts
      validators.ts
      decomposition.ts
      addition.ts
      subtraction.ts
      multiplication.ts
      division.ts
      formatters.ts
      __tests__/
        addition.test.ts
        decomposition.test.ts
  data/
    sources.ts
  styles/
    index.css
  main.tsx
```

## 9. Modelo de dominio

### 9.1. Tipos base

```ts
export type AbnOperation = 'addition' | 'subtraction' | 'multiplication' | 'division';

export type AbnStepKind =
  | 'decomposition'
  | 'accumulation'
  | 'partial-product'
  | 'subtraction-jump'
  | 'division-chunk'
  | 'result';

export type AbnStep = {
  id: string;
  kind: AbnStepKind;
  title: string;
  explanation: string;
  expression: string;
  beforeValue?: number;
  changeValue?: number;
  afterValue?: number;
  partialResult?: number;
};

export type AbnCalculationResult = {
  operation: AbnOperation;
  operands: number[];
  result: number;
  steps: AbnStep[];
};
```

### 9.2. Resultado de validación

```ts
export type ValidationResult =
  | { valid: true; value: number }
  | { valid: false; message: string };
```

## 10. Lógica ABN para suma

### 10.1. Descomposición decimal

Función propuesta:

```ts
export function decomposeByPlaceValue(value: number): number[];
```

Ejemplos:

```ts
decomposeByPlaceValue(276); // [200, 70, 6]
decomposeByPlaceValue(304); // [300, 4]
decomposeByPlaceValue(1005); // [1000, 5]
```

### 10.2. Generador de pasos de suma

Función propuesta:

```ts
export function generateAbnAdditionSteps(a: number, b: number): AbnCalculationResult;
```

Comportamiento esperado:

1. Validar que `a` y `b` son enteros no negativos.
2. Descomponer `b`.
3. Crear un paso inicial de descomposición.
4. Crear un paso por cada fragmento de `b`.
5. Crear paso final de resultado.

Ejemplo:

```ts
generateAbnAdditionSteps(348, 276);
```

Resultado conceptual:

```ts
{
  operation: 'addition',
  operands: [348, 276],
  result: 624,
  steps: [
    {
      id: 'decomposition-276',
      kind: 'decomposition',
      title: 'Descomponemos 276',
      explanation: 'Para sumar de forma ABN, descomponemos 276 en 200 + 70 + 6.',
      expression: '276 = 200 + 70 + 6'
    },
    {
      id: 'add-200',
      kind: 'accumulation',
      title: 'Añadimos 200',
      explanation: 'Partimos de 348 y añadimos 200.',
      expression: '348 + 200 = 548',
      beforeValue: 348,
      changeValue: 200,
      afterValue: 548
    }
  ]
}
```

## 11. Componentes principales

### 11.1. `OperationForm`

Responsabilidades:

- recoger operandos;
- seleccionar operación;
- mostrar errores de validación;
- lanzar cálculo.

No debe contener lógica ABN.

### 11.2. `StepNavigator`

Responsabilidades:

- mostrar paso actual;
- botones anterior/siguiente;
- indicador de progreso;
- botón para mostrar todos.

### 11.3. `StepCard`

Responsabilidades:

- renderizar un `AbnStep`;
- mostrar explicación, expresión y valores;
- no modificar estado global.

### 11.4. `StepsSummary`

Responsabilidades:

- mostrar todos los pasos en orden;
- permitir copiar el resumen, opcional.

### 11.5. `VisualNumberLine`

Responsabilidades:

- visualizar cambios acumulativos de forma sencilla;
- inicialmente puede ser textual o con una barra simple;
- evitar complejidad prematura.

### 11.6. `PlaceValueBlocks`

Responsabilidades:

- representar centenas, decenas y unidades;
- útil para suma/resta en Primaria;
- inicialmente puede usar tarjetas o chips visuales.

## 12. Validaciones

Para el MVP:

- Solo números enteros.
- Solo valores positivos o cero.
- Rango recomendado: `0` a `9999`.
- Mensajes claros.

Ejemplos de errores:

```txt
Introduce un número válido.
El número debe ser entero.
El número debe estar entre 0 y 9999.
La suma solo admite números naturales en esta versión.
```

## 13. Diseño UX/UI

### 13.1. Principios

- Interfaz clara, amable y educativa.
- Tipografía grande y legible.
- Pocos elementos simultáneos.
- Explicaciones breves por paso.
- Separar visualmente operación, paso actual y resultado.
- Pensar en uso en móvil, tablet y proyector de aula.

### 13.2. Layout sugerido para calculadora

```txt
[Selector de operación]
[Input A] [Input B] [Calcular]

[Operación actual: 348 + 276]

[Tarjeta del paso actual]
[Visualización]

[Anterior] [Paso 2 de 4] [Siguiente]

[Ver todos los pasos]
```

### 13.3. Estados de UI

- Estado inicial sin operación.
- Estado con errores de validación.
- Estado con cálculo generado.
- Estado mostrando paso individual.
- Estado mostrando resumen.

## 14. Testing

### 14.1. Tests unitarios mínimos

Crear tests para:

- descomposición decimal;
- suma ABN básica;
- suma con ceros intermedios;
- suma con segundo sumando cero;
- validación de números;
- generación de resultado correcto;
- número de pasos esperado.

Ejemplos:

```ts
expect(decomposeByPlaceValue(276)).toEqual([200, 70, 6]);
expect(decomposeByPlaceValue(304)).toEqual([300, 4]);
expect(generateAbnAdditionSteps(348, 276).result).toBe(624);
```

### 14.2. Tests de componentes

Testear:

- el formulario muestra errores;
- al calcular se renderiza el primer paso;
- botón siguiente avanza;
- botón anterior retrocede;
- vista resumen muestra todos los pasos.

## 15. Criterios de aceptación del MVP

El MVP se considera terminado cuando:

- La app arranca con `npm run dev`.
- La build funciona con `npm run build`.
- Los tests pasan con `npm test`.
- La calculadora de suma genera pasos correctos.
- La lógica ABN está separada de los componentes.
- La página de fuentes lista los recursos principales.
- No hay errores TypeScript.
- No se usa `any` innecesariamente.
- La UI es usable en móvil y escritorio.
- Los inputs están validados.

## 16. Comandos esperados

```bash
npm install
npm run dev
npm run build
npm run test
npm run lint
```

## 17. Scripts recomendados en `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "lint": "eslint ."
  }
}
```

## 18. Convenciones de código

- Usar nombres en inglés para código.
- Usar textos visibles en español.
- Separar datos estáticos en `src/data`.
- Separar lógica de dominio en `src/features/abn`.
- Mantener funciones puras para cálculo.
- No mezclar cálculo con renderizado.
- No introducir backend hasta que exista una necesidad clara.

## 19. Fuentes de información a usar

Las fuentes deben utilizarse para construir las explicaciones pedagógicas, validar la terminología y orientar las estrategias de cálculo. No deben copiarse textos extensos literalmente. Se deben resumir y adaptar los contenidos con lenguaje propio.

### 19.1. Fuentes académicas y marco teórico

#### 1. Jaime Martínez Montero — “El método de cálculo abierto basado en números ABN como alternativa de futuro respecto a los métodos tradicionales cerrados basados en cifras”

- Tipo: artículo académico.
- Uso recomendado: marco teórico, definición del método ABN, comparación con algoritmos tradicionales CBC y justificación pedagógica.
- Enlace PDF: https://dialnet.unirioja.es/descarga/articulo/3795845.pdf
- Nota: fuente clave del autor principal del método ABN.

#### 2. Universidad de Valladolid — “El método ABN”

- Tipo: Trabajo Fin de Grado.
- Uso recomendado: introducción general, explicación del método, comparativa con metodología tradicional y recursos para aula.
- Enlace PDF: https://uvadoc.uva.es/bitstream/10324/14652/1/TFG-G1429.pdf

#### 3. Universidad de Málaga — “Método ABN. Por un aprendizaje matemático sencillo, natural y divertido”

- Tipo: trabajo académico / propuesta didáctica.
- Uso recomendado: fundamentación teórica y propuesta de secuenciación para primer curso.
- Enlace PDF: https://riuma.uma.es/bitstreams/87319a07-e4c7-40a4-99f5-70be045a1314/download

#### 4. Universidad de Cádiz — Tesis doctoral sobre método ABN

- Tipo: tesis doctoral.
- Uso recomendado: respaldo investigador, evaluación de metodología ABN y comparación con modelos tradicionales.
- Enlace PDF: https://rodin.uca.es/bitstream/handle/10498/22904/TESIS%20DOCTORAL%20MC%20CANTO%20LOPEZ.pdf?isAllowed=y&sequence=1
- Página del repositorio: https://rodin.uca.es/handle/10498/22904

#### 5. Universidad de Valladolid — “El cálculo mental a través del método ABN”

- Tipo: Trabajo Fin de Grado en Educación Primaria.
- Uso recomendado: cálculo mental, estrategias de composición y descomposición, enfoque aplicado a Primaria.
- Enlace PDF: https://uvadoc.uva.es/bitstream/handle/10324/41461/TFG-B.%201520.pdf?sequence=1

#### 6. Universidad de Valladolid — “El uso de ABN frente a los algoritmos tradicionales. Análisis comparativo con estudiantes de Primaria”

- Tipo: Trabajo Fin de Grado.
- Uso recomendado: comparación ABN vs. algoritmos tradicionales con alumnado de Primaria.
- Enlace PDF: https://uvadoc.uva.es/bitstream/handle/10324/58938/TFG%20B.1907.pdf?sequence=1

### 19.2. Guías docentes, secuenciación y formación

#### 7. CEP de Ronda — “Curso Método ABN. Primer ciclo”

- Tipo: guía formativa para docentes.
- Uso recomendado: empezar con ABN en 1.º y 2.º de Primaria, numeración, manipulación, suma, resta y uso de rejillas.
- Enlace PDF: https://calculoabn.com/0.1/wordpress/4.7.z/wp-content/uploads/abn-primer-ciclo-2.pdf

#### 8. Orientación Andújar / CEP de Ronda — “Curso Método ABN Primer Ciclo”

- Tipo: material formativo replicado.
- Uso recomendado: explicación práctica del método, ejemplos de aula y progresión de contenidos.
- Enlace PDF: https://www.orientacionandujar.es/wp-content/uploads/2016/05/curso-METODO-ABN-PRIMER-CICLO.pdf

#### 9. CEIP Huerta Retiro — “Secuencia en el aprendizaje de las matemáticas mediante método ABN”

- Tipo: itinerario / secuenciación.
- Uso recomendado: programación por niveles, progresión desde Infantil hasta Primaria, contenidos y recomendaciones metodológicas.
- Enlace PDF: https://blogsaverroes.juntadeandalucia.es/trovador/files/2019/07/Itinerario-ABN.pdf

#### 10. Junta de Castilla y León / CFIE León — “El método ABN en Educación Primaria”

- Tipo: resumen docente.
- Uso recomendado: explicación breve del método ABN en Primaria y contraste con algoritmos cerrados tradicionales.
- Enlace PDF: https://www.educa.jcyl.es/crol/es/recursos-educativos/metodo-abn-educacion-primaria.ficheros/1460115-Resumen%20Quevedo%20ABN-%20Carlos.pdf
- Página del recurso: https://www.educa.jcyl.es/crol/es/recursos-educativos/metodo-abn-educacion-primaria

#### 11. Junta de Castilla y León — “Repositorio de tareas formación método ABN Ed. Primaria”

- Tipo: tareas y actividades de formación.
- Uso recomendado: fases de aprendizaje de la suma, numeración, actividades prácticas para el aula.
- Enlace PDF: https://www.educa.jcyl.es/crol/es/recursos-educativos/abn-primaria-actividades.ficheros/1535272-Tareas%20ABN%20Primaria%20%281%29.pdf

#### 12. Programación ABN Primer Ciclo — María Luisa Igea Serrano

- Tipo: programación didáctica.
- Uso recomendado: bloques de contenido ABN: numeración, cálculo, resolución de problemas y competencia matemática.
- Enlace PDF: https://calculoabn.com/0.1/wordpress/4.7.z/wp-content/uploads/programacion-definitiva-primer-ciclo-02.pdf

### 19.3. Material práctico para aula

#### 13. Cálculo ABN — tareas de repaso para 1.º de Primaria

- Tipo: cuaderno de tareas.
- Uso recomendado: fichas prácticas de conteo, descomposición, mitad, tabla del 100, cálculo básico y numeración.
- Enlace PDF: https://calculoabn.com/0.1/wordpress/4.7.z/wp-content/uploads/tareas-abn-para-repaso-de-1%C2%BA-de-primaria-2-1.pdf

#### 14. Colegio Los Pinos Algeciras — “Actividades Algoritmo ABN”

- Tipo: actividades didácticas.
- Uso recomendado: suma, resta, decenas y ejercicios prácticos de introducción al método.
- Enlace PDF: https://www.orientacionandujar.es/wp-content/uploads/2015/09/Actividades-Algoritmo-ABN-DEPARTAMENTO-DE-MATEM%C3%81TICAS-COLEGIO-LOS-PINOS-ALGECIRAS.pdf

#### 15. Junta de Castilla y León — “ABN en Educación Primaria. Los problemas matemáticos, representación y algoritmo de la suma”

- Tipo: sesión formativa / presentación docente.
- Uso recomendado: problemas matemáticos, representación, algoritmo de la suma y consejos para empezar con ABN.
- Enlace PDF: https://www.educa.jcyl.es/crol/es/recursos-educativos/abn-educacion-primaria-3.ficheros/1083785-Metodo_abn.PRIM._puebla.1.pdf

#### 16. Junta de Castilla y León — “Método ABN operaciones”

- Tipo: sesión formativa.
- Uso recomendado: resta, escalera ascendente, igualación y operaciones ABN.
- Enlace PDF: https://www.educa.jcyl.es/crol/es/recursos-educativos/metodo-abn-operciones-4.ficheros/1083762-4%20sesion.pdf

### 19.4. Fuente oficial / repositorio general

#### 17. Web oficial del método ABN — Materiales del método ABN

- Tipo: repositorio oficial de materiales.
- Uso recomendado: localizar plantillas, materiales descargables, guías y recursos complementarios.
- Enlace: https://metodoabn.es/materiales-del-metodo-abn/

## 20. Prioridad recomendada de fuentes

Para implementar contenido inicial y validar explicaciones, priorizar:

1. Martínez Montero 2011 — base teórica.
2. Tesis doctoral UCA — respaldo investigador.
3. CEP de Ronda / Curso ABN Primer Ciclo — práctica docente.
4. Itinerario ABN CEIP Huerta Retiro — secuenciación por niveles.
5. Materiales prácticos de Cálculo ABN, JCyl y Orientación Andújar — ejercicios y ejemplos.

## 21. Instrucciones concretas para el agente de Cursor

El agente debe empezar creando un proyecto frontend con React + TypeScript + Vite y Tailwind.

Prioridades de implementación:

1. Configurar proyecto base.
2. Crear estructura de carpetas.
3. Implementar tipos ABN.
4. Implementar `decomposeByPlaceValue`.
5. Implementar `generateAbnAdditionSteps`.
6. Añadir tests unitarios.
7. Crear UI mínima de calculadora.
8. Crear navegación entre páginas.
9. Crear página de fuentes usando `src/data/sources.ts`.
10. Revisar accesibilidad básica.
11. Ejecutar build y tests.

No añadir backend todavía.
No añadir autenticación.
No añadir dependencias salvo que sean necesarias.
No meter lógica de cálculo dentro de componentes.

## 22. Ejemplo de prompt inicial para Cursor

```txt
Crea una aplicación web llamada "ABN Paso a Paso" usando React, TypeScript, Vite y Tailwind CSS.

Objetivo del MVP:
- Landing page.
- Página "Qué es ABN".
- Página "Calculadora" con suma ABN paso a paso.
- Página "Fuentes".

Implementa la lógica ABN en `src/features/abn`, separada del JSX.
Crea una función `decomposeByPlaceValue(value: number): number[]` y una función `generateAbnAdditionSteps(a: number, b: number): AbnCalculationResult`.

La calculadora debe aceptar dos números enteros entre 0 y 9999, validar entradas, generar pasos explicados y permitir avanzar/retroceder paso a paso.

Añade tests con Vitest para la descomposición y la suma ABN.
Usa componentes funcionales, hooks simples, TypeScript estricto y evita `any`.
No crees backend en esta primera versión.
```

## 23. Riesgos y decisiones pendientes

### 23.1. Riesgos

- Implementar operaciones ABN de forma demasiado simplificada y alejada de la práctica docente.
- Mezclar varias estrategias sin explicar cuál se usa.
- Sobrecargar la UI con demasiadas visualizaciones.
- Convertir la app en una calculadora de resultados en vez de una herramienta de aprendizaje.

### 23.2. Decisiones pendientes

- Nombre definitivo del proyecto.
- Estilo visual: infantil, docente, minimalista o mixto.
- Estrategias exactas de resta a implementar primero.
- Si la división se hará por reparto, agrupación o tabla de cociente acumulado.
- Si se incluirán cursos/niveles desde el principio.

## 24. Recomendación final de implementación

Empezar pequeño y robusto:

1. Suma ABN perfecta.
2. Visualización clara.
3. Tests fiables.
4. Buen diseño responsive.
5. Fuentes bien organizadas.

Después ampliar a resta, multiplicación y división.

La calidad del motor de pasos es más importante que la cantidad de operaciones implementadas en la primera versión.
