export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(min, num), max);
}

export function degree(num: string | number): number {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  return ((n % 360) + 360) % 360;
}

export function resolveAlpha(a: string | number | undefined): number {
  const n = typeof a === 'string' ? parseFloat(a) : (a ?? NaN);
  return clamp(isNaN(n) ? 1 : n, 0, 1);
}

/**
 * Round to a given number of decimal places.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 */
export function decimal(num: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(num * factor) / factor;
}

export function getRandom(min: number, max: number, precision = 0): number {
  const num = Math.random() * (max - min) + min;
  return decimal(num, precision);
}

export function arrayIsEqual(arr1: unknown[], arr2: unknown[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((v, i) =>
      Array.isArray(v) ? arrayIsEqual(v, arr2[i] as unknown[]) : v === arr2[i],
    )
  );
}

/**
 * Linearizes an sRGB channel value for relative luminance calculation.
 *
 * The sRGB transfer function must be removed before applying the luminance
 * coefficients.  Without this step, mid-range grays are significantly
 * overestimated.
 *
 * @param value — sRGB component in the range 0–1.
 * @returns Linear-light component in the range 0–1.
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function linearize(value: number): number {
  return value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4;
}
