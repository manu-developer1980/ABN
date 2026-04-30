export type SourceCategoryId =
  | 'theory'
  | 'guides'
  | 'practice'
  | 'general';

export type SourceItem = {
  title: string;
  type: string;
  usage: string;
  href: string;
};

export type SourceCategory = {
  id: SourceCategoryId;
  label: string;
  items: SourceItem[];
};

export const sourceCategories: SourceCategory[] = [
  {
    id: 'theory',
    label: 'Marco teórico',
    items: [
      {
        title:
          'Jaime Martínez Montero — El método de cálculo abierto basado en números ABN',
        type: 'Artículo académico',
        usage:
          'Marco teórico, definición del método ABN y comparación con algoritmos tradicionales.',
        href: 'https://dialnet.unirioja.es/descarga/articulo/3795845.pdf',
      },
      {
        title: 'Universidad de Valladolid — El método ABN',
        type: 'Trabajo Fin de Grado',
        usage:
          'Introducción general, explicación del método y comparativa con metodología tradicional.',
        href: 'https://uvadoc.uva.es/bitstream/10324/14652/1/TFG-G1429.pdf',
      },
      {
        title:
          'Universidad de Málaga — Método ABN. Por un aprendizaje matemático sencillo, natural y divertido',
        type: 'Trabajo académico',
        usage: 'Fundamentación teórica y propuesta didáctica para primer curso.',
        href: 'https://riuma.uma.es/bitstreams/87319a07-e4c7-40a4-99f5-70be045a1314/download',
      },
      {
        title: 'Universidad de Cádiz — Tesis doctoral sobre método ABN',
        type: 'Tesis doctoral',
        usage:
          'Respaldo investigador, evaluación de metodología ABN y comparación con modelos tradicionales.',
        href: 'https://rodin.uca.es/bitstream/handle/10498/22904/TESIS%20DOCTORAL%20MC%20CANTO%20LOPEZ.pdf?isAllowed=y&sequence=1',
      },
    ],
  },
  {
    id: 'guides',
    label: 'Guías docentes y secuenciación',
    items: [
      {
        title: 'CEP de Ronda — Curso Método ABN. Primer ciclo',
        type: 'Guía formativa',
        usage:
          'Inicio con ABN en 1.º y 2.º de Primaria: numeración, manipulación y suma.',
        href: 'https://calculoabn.com/0.1/wordpress/4.7.z/wp-content/uploads/abn-primer-ciclo-2.pdf',
      },
      {
        title: 'CEIP Huerta Retiro — Secuencia en el aprendizaje de las matemáticas mediante método ABN',
        type: 'Itinerario',
        usage: 'Programación por niveles y progresión desde Infantil hasta Primaria.',
        href: 'https://blogsaverroes.juntadeandalucia.es/trovador/files/2019/07/Itinerario-ABN.pdf',
      },
      {
        title: 'Junta de Castilla y León — El método ABN en Educación Primaria',
        type: 'Resumen docente',
        usage: 'Explicación breve del método en Primaria y contraste con algoritmos cerrados.',
        href: 'https://www.educa.jcyl.es/crol/es/recursos-educativos/metodo-abn-educacion-primaria',
      },
    ],
  },
  {
    id: 'practice',
    label: 'Materiales prácticos',
    items: [
      {
        title: 'Cálculo ABN — Tareas de repaso para 1.º de Primaria',
        type: 'Cuaderno de tareas',
        usage: 'Fichas prácticas de conteo, descomposición y cálculo básico.',
        href: 'https://calculoabn.com/0.1/wordpress/4.7.z/wp-content/uploads/tareas-abn-para-repaso-de-1%C2%BA-de-primaria-2-1.pdf',
      },
      {
        title: 'Junta de Castilla y León — ABN en Educación Primaria (problemas y suma)',
        type: 'Sesión formativa',
        usage: 'Problemas matemáticos, representación y algoritmo de la suma.',
        href: 'https://www.educa.jcyl.es/crol/es/recursos-educativos/abn-educacion-primaria-3.ficheros/1083785-Metodo_abn.PRIM._puebla.1.pdf',
      },
    ],
  },
  {
    id: 'general',
    label: 'Repositorio general',
    items: [
      {
        title: 'Web oficial del método ABN — Materiales',
        type: 'Repositorio oficial',
        usage: 'Plantillas, materiales descargables y recursos complementarios.',
        href: 'https://metodoabn.es/materiales-del-metodo-abn/',
      },
    ],
  },
];
