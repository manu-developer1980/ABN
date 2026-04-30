export type AbnOperation =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division';

export type AbnStepKind =
  | 'decomposition'
  | 'accumulation'
  | 'addition-transfer'
  | 'partial-product'
  | 'subtraction-parallel'
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

/** Rejilla tipo tabla del material ABN (traslado en suma: de segundo sumando al primero). */
export type AbnAdditionGrid = {
  kind: 'addition-transfer';
  initialLeft: number;
  initialRight: number;
  parts: number[];
  rows: { part: number; leftAfter: number; rightAfter: number }[];
};

/** Rejilla resta: misma cantidad del minuendo y de “lo que falta por restar”. */
export type AbnSubtractionGrid = {
  kind: 'subtraction-parallel';
  initialMinuend: number;
  initialSubtrahend: number;
  chunks: number[];
  rows: { chunk: number; minuendAfter: number; subtrahendAfter: number }[];
};

/** Multiplicación: tabla 3 columnas (un dígito en el multiplicador) o matriz (varias cifras). */
export type AbnMultiplicationGrid =
  | {
      kind: 'multiplication-3col';
      multiplicandParts: number[];
      multiplier: number;
      partialProducts: number[];
      runningTotals: (number | null)[];
    }
  | {
      kind: 'multiplication-matrix';
      aParts: number[];
      bParts: number[];
      matrix: number[][];
      rowSums: number[];
      total: number;
    };

/** División: resto | cantidad quitada (k×divisor) | cociente parcial. */
export type AbnDivisionGrid = {
  kind: 'division-three-col';
  divisor: number;
  /** Primera fila: dividendo inicial; siguientes: resto tras cada paso; última: resto final. */
  rows: {
    remainder: number;
    subtracted: number | null;
    partialQuotient: number | null;
  }[];
  totalQuotient: number;
  finalRemainder: number;
};

export type AbnRejilla =
  | AbnAdditionGrid
  | AbnSubtractionGrid
  | AbnMultiplicationGrid
  | AbnDivisionGrid;

export type AbnCalculationResult = {
  operation: AbnOperation;
  operands: number[];
  result: number;
  steps: AbnStep[];
  /** Datos para la rejilla ABN del paso a paso (material escolar). */
  abnGrid?: AbnRejilla;
};

export type ValidationResult =
  | { valid: true; value: number }
  | { valid: false; message: string };
