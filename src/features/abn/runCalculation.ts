import type { AbnCalculationResult, AbnOperation } from './types';
import { generateAbnAdditionSteps } from './addition';
import { generateAbnDivisionSteps } from './division';
import { generateAbnMultiplicationSteps } from './multiplication';
import { generateAbnSubtractionSteps } from './subtraction';

export function runAbnCalculation(
  operation: AbnOperation,
  a: number,
  b: number,
): AbnCalculationResult {
  switch (operation) {
    case 'addition':
      return generateAbnAdditionSteps(a, b);
    case 'subtraction':
      return generateAbnSubtractionSteps(a, b);
    case 'multiplication':
      return generateAbnMultiplicationSteps(a, b);
    case 'division':
      return generateAbnDivisionSteps(a, b);
    default: {
      const _exhaustive: never = operation;
      return _exhaustive;
    }
  }
}
