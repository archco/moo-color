export function padStart(str: string, length: number, chars: string): string {
  const space = length - str.length;
  return space > 0 ? `${makePad(chars, space)}${str}` : str;
}

export function padEnd(str: string, length: number, chars: string): string {
  const space = length - str.length;
  return space > 0 ? `${str}${makePad(chars, space)}` : str;
}

function makePad(chars: string, limit: number): string {
  while (chars.length < limit) {
    chars += chars;
  }
  return chars.length > limit ? chars.substring(chars.length - limit) : chars;
}

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(min, num), max);
}

export function degree(num: string|number): number {
  num = typeof num === 'string' ? parseFloat(num) : num;
  return (num % 360 + 360) % 360;
}

export function resolveAlpha(a: string|number): number {
  a = typeof a === 'string' ? parseFloat(a) : a;
  return clamp(isNaN(a) ? 1 : a, 0, 1);
}

// @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
export function decimal(num: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

export function getRandom(min: number, max: number, precision: number = 0): number {
  const num = Math.random() * (max - min) + min;
  return decimal(num, precision);
}
