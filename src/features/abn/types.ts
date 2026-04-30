export type AbnOperation =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division';

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

export type ValidationResult =
  | { valid: true; value: number }
  | { valid: false; message: string };
