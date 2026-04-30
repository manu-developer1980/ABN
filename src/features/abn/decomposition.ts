/**
 * Decomposes a non-negative integer into place-value parts (highest to lowest).
 * Zeros are omitted. Example: 276 -> [200, 70, 6], 304 -> [300, 4].
 */
export function decomposeByPlaceValue(value: number): number[] {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError('value must be a non-negative integer');
  }
  if (value === 0) {
    return [0];
  }
  const str = String(value);
  const len = str.length;
  const parts: number[] = [];
  for (let i = 0; i < len; i++) {
    const digit = Number(str[i]);
    if (digit !== 0) {
      const place = len - 1 - i;
      parts.push(digit * 10 ** place);
    }
  }
  return parts;
}
