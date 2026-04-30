import { OPERAND_MAX, OPERAND_MIN } from './constants';
import type { ValidationResult } from './types';

const MESSAGES = {
  invalidNumber: 'Introduce un número válido.',
  notInteger: 'El número debe ser entero.',
  outOfRange: `El número debe estar entre ${OPERAND_MIN} y ${OPERAND_MAX}.`,
} as const;

function isIntegerString(raw: string): boolean {
  if (raw.trim() === '') return false;
  return /^-?\d+$/.test(raw.trim());
}

/**
 * Validates a string operand for natural numbers in the MVP range.
 */
export function validateOperandInput(raw: string): ValidationResult {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return { valid: false, message: MESSAGES.invalidNumber };
  }
  if (!isIntegerString(trimmed)) {
    return { valid: false, message: MESSAGES.notInteger };
  }
  const value = Number(trimmed);
  if (!Number.isSafeInteger(value)) {
    return { valid: false, message: MESSAGES.invalidNumber };
  }
  if (value < OPERAND_MIN || value > OPERAND_MAX) {
    return { valid: false, message: MESSAGES.outOfRange };
  }
  return { valid: true, value };
}
