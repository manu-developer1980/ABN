import type { AbnCalculationResult, AbnStep } from './types';

function formatStepBlock(step: AbnStep, index: number, total: number): string {
  const lines: string[] = [];
  lines.push(`Paso ${index + 1} de ${total}: ${step.title}`);
  lines.push(step.explanation);
  if (
    step.beforeValue !== undefined &&
    step.changeValue !== undefined &&
    step.afterValue !== undefined
  ) {
    lines.push('');
    lines.push(`Antes: ${step.beforeValue}`);
    lines.push(`Cambio: +${step.changeValue}`);
    lines.push(`Después: ${step.afterValue}`);
    lines.push('');
  }
  lines.push(step.expression);
  return lines.join('\n');
}

/**
 * Plain-text summary of the full calculation for display or clipboard.
 */
export function formatCalculationPlainText(result: AbnCalculationResult): string {
  const [a, b] = result.operands;
  const header = `Operación: ${a} + ${b}`;
  const body = result.steps
    .filter((s) => s.kind !== 'result')
    .map((step, i, arr) => formatStepBlock(step, i, arr.length))
    .join('\n\n');
  const finalStep = result.steps.find((s) => s.kind === 'result');
  const tail = finalStep ? `\n\n${finalStep.title}:\n${finalStep.expression}` : '';
  return `${header}\n\n${body}${tail}`;
}
